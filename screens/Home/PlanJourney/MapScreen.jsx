import React, {useRef, useMemo, useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import InputSpinner from 'react-native-input-spinner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {API_URL} from '../../../constants';
import NavigationContext from '../../../contexts/NavigationContext';
import UserContext from '../../../contexts/UserContext';
import FloatingActionButton from '../../../components/FloatingActionButton';
import Geocoder from 'react-native-geocoding';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MapScreen = () => {
  Geocoder.init('AIzaSyBefV0iljWcdxXDQ9rxhPkjrv-eXFR6pHk');
  const [loading, setLoading] = useState(true);
  const [userRoute, setUserRoute] = useState([]);
  const [ownerRoute, setOwnerRoute] = useState([]);
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [dateEntered, setDateEntered] = useState(false);
  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [searchRadius, setSearchRadius] = useState(10);
  const [searchRadiusDefined, setSearchRadiusDefined] = useState(false);
  const [rideList, setRideList] = useState([]);
  const [fetchingRides, setFetchingRides] = useState(false);
  const [ridePublished, setRidePublished] = useState(false);

  const maxSearchRadius = useRef(10);

  const navigationContext = useContext(NavigationContext);
  const userContext = useContext(UserContext);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    return (
      6371 *
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(((lat2 - lat1) * Math.PI) / 180 / 2), 2) +
            Math.cos((lat1 * Math.PI) / 180) *
              Math.cos((lat2 * Math.PI) / 180) *
              Math.pow(Math.sin(((lon2 - lon1) * Math.PI) / 180 / 2), 2),
        ),
      )
    );
  };

  /* Calculate search radius if it's rider */
  useEffect(() => {
    if (navigationContext.navigationData.userType === 'Rider') {
      const {source, destination} = navigationContext.navigationData.rider;
      const distance = haversineDistance(
        source.latitude,
        source.longitude,
        destination.latitude,
        destination.longitude,
      );
      maxSearchRadius.current =
        parseInt(distance / 2) - (parseInt(distance / 2) % 10);
    }
  }, [navigationContext.navigationData.userType]);

  const [mapRegion, setMapRegion] = useState({
    latitude: 26.83928,
    longitude: 80.92313,
    latitudeDelta: 14,
    longitudeDelta: 4,
  });

  const sheetRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getWaypoints();
  }, []);

  const getWaypoints = async () => {
    try {
      let source, destination;
      if (navigationContext.navigationData.userType === 'Rider') {
        source = navigationContext.navigationData.rider.source;
        destination = navigationContext.navigationData.rider.destination;
      } else {
        source = navigationContext.navigationData.owner.source;
        destination = navigationContext.navigationData.owner.destination;
      }

      const {data} = await axios.post(`${API_URL}/getWaypoints`, {
        source,
        destination,
      });

      calculateRegion(source, destination);
      setUserRoute(data);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const calculateRegion = async (source, destination) => {
    const sourceLat = source.latitude;
    const sourceLng = source.longitude;
    const destLat = destination.latitude;
    const destLng = destination.longitude;

    const minLat = Math.min(sourceLat, destLat);
    const maxLat = Math.max(sourceLat, destLat);
    const minLng = Math.min(sourceLng, destLng);
    const maxLng = Math.max(sourceLng, destLng);

    const latitudeDelta = (maxLat - minLat) * 1.5; // Zoom out by 50%
    const longitudeDelta = (maxLng - minLng) * 1.5; // Zoom out by 50%

    const region = {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta,
      longitudeDelta,
    };

    setMapRegion(region);
  };

  const snapPoints = useMemo(() => ['50%', '5%', '85%'], []);

  // render
  const renderItem = ({item}) => {
    const date = new Date(item?.DateAndTime);

    return (
      <View style={listItemStyles.container}>
        <View style={listItemStyles.header}>
          <Text style={listItemStyles.ownerName}>
            {item?.providerDetailRef?.userName}
          </Text>
          <Text style={listItemStyles.date}>{`${
            weekDays[date.getDay()]
          }, ${date.getDate()} ${
            months[date.getMonth()]
          } @ ${date.getHours()}:${date.getMinutes()}`}</Text>
        </View>
        <View style={listItemStyles.seatsContainer}>
          {item?.avilability &&
            Array.from(Array(item?.avilability).keys()).map(i => (
              <MaterialCommunityIcons
                key={i}
                name="car-seat"
                size={20}
                color="#808080"
              />
            ))}
        </View>
        <View style={listItemStyles.navigation}>
          <View style={listItemStyles.navigationItem}>
            <MaterialCommunityIcons
              name="navigation"
              size={25}
              color={'#808080'}
              style={listItemStyles.navigationIcon}
            />
            <Text style={listItemStyles.navigationItemText}>
              {item?.source}
            </Text>
          </View>
          <View style={listItemStyles.navigationItem}>
            <MaterialIcons
              name="location-pin"
              size={25}
              color={'#808080'}
              style={listItemStyles.navigationIcon}
            />
            <Text style={listItemStyles.navigationItemText}>
              {item?.destination}
            </Text>
          </View>
          <View style={listItemStyles.buttonsContainer}>
            <Pressable
              style={listItemStyles.button}
              onPress={() => {
                setOwnerRoute(
                  item?.location?.coordinates.map(item => {
                    return {latitude: item[1], longitude: item[0]};
                  }),
                );
              }}>
              <MaterialIcons
                name="alt-route"
                size={25}
                color={'#808080'}
                style={listItemStyles.navigationIcon}
              />
              <Text style={listItemStyles.buttonText}>Compare</Text>
            </Pressable>
            <Pressable style={listItemStyles.button}>
              <MaterialCommunityIcons
                name="whatsapp"
                size={25}
                color={'#808080'}
                style={listItemStyles.navigationIcon}
              />
              <Text style={listItemStyles.buttonText}>Contact</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const handleSubmitOwner = async () => {
    try {
      setFetchingRides(true);
      const {usrToken} = userContext.userData;

      const from = navigationContext.navigationData.owner?.source;
      const to = navigationContext.navigationData.owner?.destination;

      const source = (await Geocoder.from(from)).results[0].geometry.location;
      const destination = (await Geocoder.from(to)).results[0].geometry
        .location;

      await axios.post(
        `${API_URL}/publishRide`,
        {
          avilability: seatsAvailable,
          source: {latitude: source.lat, longitude: source.lng},
          destination: {latitude: destination.lat, longitude: destination.lng},
          DateAndTime: journeyDate,
          description: '',
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${usrToken}`,
          },
        },
      );

      setFetchingRides(false);
      setRidePublished(true);
    } catch (e) {
      setFetchingRides(false);
      console.log(e);
    }
  };

  const handleSubmitRider = async () => {
    try {
      setFetchingRides(true);
      setSearchRadiusDefined(true);
      const {source, destination} = navigationContext.navigationData.rider;
      const {data} = await axios.post(`${API_URL}/getList`, {
        source,
        destination,
        radius: searchRadius * 1000,
      });
      console.log(JSON.stringify(data.rideList, null, 2));
      setRideList(data.rideList);
      setFetchingRides(false);
    } catch (e) {
      setFetchingRides(false);
      console.log(e);
    }
  };

  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.laodingContainer]}>
          <ActivityIndicator color={'#000000'} size={50} />
          <Text style={styles.loadingText}>Calculating your route ...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={mapRegion}>
            <Polyline
              coordinates={userRoute}
              strokeColor="#000"
              strokeWidth={6}
            />
            {ownerRoute && ownerRoute.length ? (
              <Polyline
                coordinates={ownerRoute}
                strokeColor="#ffa500"
                strokeWidth={6}
              />
            ) : null}
            {navigationContext?.navigationData.rider?.source && (
              <>
                <Marker
                  coordinate={navigationContext.navigationData?.rider.source}
                />
                <Marker
                  coordinate={
                    navigationContext.navigationData?.rider.destination
                  }
                />
              </>
            )}
            {navigationContext?.navigationData.owner?.source && (
              <>
                <Marker
                  coordinate={navigationContext.navigationData?.owner.source}
                />
                <Marker
                  coordinate={
                    navigationContext.navigationData?.owner.destination
                  }
                />
              </>
            )}
          </MapView>

          <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
            {navigationContext.navigationData.userType === 'Rider' && (
              <>
                {searchRadiusDefined ? (
                  <>
                    {fetchingRides ? (
                      <>
                        <ActivityIndicator
                          size={50}
                          color="#000000"
                          style={styles.bottomSheetLoadingSpinner}
                        />
                        <Text style={styles.loadingText}>
                          Fetching Rides for you
                        </Text>
                      </>
                    ) : (
                      <>
                        {rideList && rideList?.length ? (
                          <BottomSheetFlatList
                            data={rideList}
                            keyExtractor={item => item?._id}
                            renderItem={renderItem}
                            contentContainerStyle={styles.contentContainer}
                          />
                        ) : (
                          <View style={styles.noRidesContainer}>
                            <Text style={styles.noRidesText}>
                              Oops! Couldn't fetch any rides for you.
                            </Text>
                          </View>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <View style={styles.ownerInfoFormContainer}>
                    <Text style={styles.datePickerHeading}>
                      Search Radius (in KMs)?
                    </Text>
                    <View style={styles.inputSpinnerContainer}>
                      <InputSpinner
                        fontSize={20}
                        background={'#808080'}
                        buttonStyle={{
                          backgroundColor: '#000000',
                        }}
                        max={maxSearchRadius.current}
                        min={10}
                        step={10}
                        value={searchRadius}
                        onChange={num => setSearchRadius(num)}
                      />
                    </View>
                    <FloatingActionButton onPress={handleSubmitRider} />
                  </View>
                )}
              </>
            )}
            {navigationContext.navigationData.userType === 'Owner' && (
              <View style={styles.ownerInfoFormContainer}>
                {ridePublished && (
                  <Text style={styles.datePickerHeading}>
                    Your ride's been published!
                  </Text>
                )}
                {dateEntered && !ridePublished && (
                  <>
                    <Text style={styles.datePickerHeading}>
                      How many seats available?
                    </Text>
                    <View style={styles.inputSpinnerContainer}>
                      <InputSpinner
                        fontSize={20}
                        background={'#808080'}
                        buttonStyle={{
                          backgroundColor: '#000000',
                        }}
                        max={7}
                        min={1}
                        step={1}
                        value={seatsAvailable}
                        onChange={num => setSeatsAvailable(num)}
                      />
                    </View>
                  </>
                )}
                {!dateEntered && !ridePublished && (
                  <>
                    <Text style={styles.datePickerHeading}>
                      When do you start?
                    </Text>
                    <DatePicker
                      open={true}
                      date={journeyDate}
                      onDateChange={date => {
                        setJourneyDate(date);
                      }}
                    />
                  </>
                )}
                {!ridePublished && (
                  <FloatingActionButton
                    onPress={
                      dateEntered
                        ? handleSubmitOwner
                        : () => setDateEntered(true)
                    }
                    loading={fetchingRides}
                  />
                )}
              </View>
            )}
          </BottomSheet>
        </View>
      )}
      {navigationContext.navigationData.userType === 'Rider' &&
        searchRadiusDefined && (
          <View style={styles.referenceOverlay}>
            <View style={styles.referenceOverlayItem}>
              <View style={[styles.marker, {backgroundColor: '#000000'}]} />
              <Text style={styles.markerText}>You</Text>
            </View>
            <View style={styles.referenceOverlayItem}>
              <View style={[styles.marker, {backgroundColor: '#ffa500'}]} />
              <Text style={styles.markerText}>Provider</Text>
            </View>
          </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  laodingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginVertical: 20,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
  },
  map: {
    alignSelf: 'stretch',
    height: '100%',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
  },
  ownerInfoFormContainer: {
    minHeight: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  datePickerHeading: {
    fontSize: 24,
    fontFamily: 'Raleway-SemiBold',
    marginBottom: 20,
  },
  inputSpinnerContainer: {
    width: '50%',
  },
  bottomSheetLoadingSpinner: {
    marginTop: '20%',
  },
  noRidesContainer: {
    minHeight: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRidesText: {
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'center',
  },
  referenceOverlay: {
    position: 'absolute',
    left: 5,
    top: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
  },
  referenceOverlayItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marker: {
    height: 14,
    width: 14,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: -2,
  },
  markerText: {
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
});

const listItemStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  ownerName: {
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    textTransform: 'capitalize',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: 'Raleway-Regular',
  },
  seatsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  navigation: {
    marginVertical: 5,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  navigationIcon: {
    marginRight: 10,
  },
  navigationItemText: {
    fontFamily: 'Raleway-Regular',
    maxWidth: '90%',
  },
  buttonsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    marginVertical: 5,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
});

export default MapScreen;
