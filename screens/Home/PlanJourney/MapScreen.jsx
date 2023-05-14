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
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
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

    const region = {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: maxLat - minLat + 0.1,
      longitudeDelta: maxLng - minLng + 0.1,
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

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

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
          </MapView>

          <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
            <BottomSheetFlatList
              data={data}
              keyExtractor={i => i}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
            />
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
});

export default MapScreen;
