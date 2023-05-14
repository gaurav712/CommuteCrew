import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../components/CustomText';
import UserContext from '../../contexts/UserContext';

const ProfileScreen = () => {
  return (
    <UserContext.Consumer>
      {userContext => (
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {userContext.userData?.userName || '-'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Contact Details</Text>
            <CustomText
              Icon={() => (
                <MaterialIcons name="phone" size={25} color="#808080" />
              )}
              text={userContext.userData?.contactNumber || '-'}
            />
          </View>
          <View style={[styles.section, {borderTopWidth: 0.5}]}>
            <Text style={styles.heading}>Vehicle Info</Text>
            <CustomText
              Icon={() => (
                <MaterialCommunityIcons name="car" size={25} color="#808080" />
              )}
              text={userContext.userData?.license || '-'}
            />
          </View>
          <Pressable style={styles.editIconContainer}>
            <MaterialIcons name="edit" size={30} />
          </Pressable>
        </View>
      )}
    </UserContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  nameContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Raleway-SemiBold',
  },
  section: {
    paddingVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Raleway-SemiBold',
    marginBottom: 10,
  },
  editIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
});

export default ProfileScreen;
