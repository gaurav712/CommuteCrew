import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {API_URL} from '../../constants';
import UserContext from '../../contexts/UserContext';

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

const YourRidesScreen = () => {
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const [listOfRides, setListOfRides] = useState([]);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const {_id} = userContext.userData;
      const {data} = await axios.post(`${API_URL}/provider/getRidesList`, {
        _id,
      });
      setListOfRides(data?.listofRides);
      console.log(JSON.stringify(data?.listofRides, null, 2));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Rides</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const date = new Date(item?.DateAndTime);
    console.log('Hellooo');

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
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size={50} color={'#000000'} />
          <Text style={styles.loadingText}>
            Fetching rides you've published ...
          </Text>
        </>
      ) : (
        <FlatList
          data={listOfRides}
          keyExtractor={item => item?._id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={Header}
          refreshing={loading}
          onRefresh={() => fetchRides()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
  },
  headerContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  header: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 50,
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

export default YourRidesScreen;
