import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import loginBg from '../../assets/images/Planner-Budget.png';
import React from 'react';
import Colors from '../../utils/Colors';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import { router, useRouter } from 'expo-router';

export default function loginScreen() {
  const route = useRouter();
  
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      await services.storeData('login', 'true');
      route.replace('/');
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Image source={loginBg} style={styles.bgImage} />
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          height: '100%',
          padding: 20,
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.WHITE,
          }}
        >
          Personal Budget Planner
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: Colors.WHITE,
            marginTop: 20,
          }}
        >
          Stay on Track, Event By Event: Your Personal Budget Planner App!
        </Text>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text
            style={{
              color: Colors.PRIMARY,
              textAlign: 'center',
              fontSize: 25,
            }}
          >
            Login/Signup
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            textAlign: 'center',
            color: Colors.GRAY,
            marginTop: 10,
          }}
        >
          * By login/signup you wil agree to our tearms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: 242,
    height: 450,
    marginTop: 70,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: Colors.BLACK,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 20,
  },
});
