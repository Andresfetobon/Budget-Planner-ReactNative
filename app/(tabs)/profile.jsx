import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import services from '../../utils/services';
import { useRouter } from 'expo-router';
import { client } from '../../utils/KindeConfig';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useEffect } from 'react';

export default function Profile() {
  const [userData, setUserData] = useState();
  console.log(userData);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUserData(user);
  };
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData('login', 'false');
      router.replace('/login');
      // User was logged out
    }
  };
  return (
    <View style={styles.containerProfile}>
      <View style={{ backgroundColor: Colors.PRIMARY, padding: 10 }}>
        <View style={styles.containerData}>
          <Image
            source={{ uri: userData?.picture }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 99,
            }}
          />
          <View style={styles.textProfile}>
            <Text
              style={{
                fontFamily: 'outfit-bold',
                color: Colors.WHITE,
                fontSize: 20,
              }}
            >
              Andres Felipe Tobon Fernandez
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                color: Colors.WHITE,
                fontSize: 20,
              }}
            >
              Andrestromp777@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: '50%' }}>
        <TouchableOpacity style={styles.btnLogout}>
          <MaterialIcons
            name='logout'
            size={50}
            color={Colors.PURPLE}
            onPress={handleLogout}
            style={{ elevation: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerProfile: {
    flex: 1,
    marginTop: 40,
  },
  containerData: {
    alignItems: 'center',
    marginTop: 40,
  },
  textProfile: {
    alignItems: 'center',
    marginTop: 20,
  },
  btnLogout: {
    backgroundColor: Colors.GRAY,
    width: 80,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
