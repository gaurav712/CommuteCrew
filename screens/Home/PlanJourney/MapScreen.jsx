import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import {API_URL} from '../../../constants';
import NavigationContext from '../../../contexts/NavigationContext';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [userRoute, setUserRoute] = useState([]);

  const [mapRegion, setMapRegion] = useState({
    latitude: 26.83928,
    longitude: 80.92313,
    latitudeDelta: 14,
    longitudeDelta: 4,
  });

  const sheetRef = useRef(null);

  const navigationContext = useContext(NavigationContext);

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

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  const snapPoints = useMemo(() => ['50%', '5%', '90%'], []);

  // render
  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );

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
              <BottomSheetFlatList
                data={data}
                keyExtractor={i => i}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
              />
            )}
            {navigationContext.navigationData.userType === 'Owner' && (
              <View style={styles.ownerInfoFormContainer}>
                <Text style={styles.datePickerHeading}>When do you start?</Text>
                <DatePicker
                  open={true}
                  date={new Date()}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                />
              </View>
            )}
          </BottomSheet>
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
  },
  map: {
    alignSelf: 'stretch',
    height: '100%',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
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
});

export default MapScreen;
