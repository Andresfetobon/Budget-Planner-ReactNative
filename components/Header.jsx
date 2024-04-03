import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { client } from '../utils/KindeConfig';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../utils/Colors';

export default function Header() {
  const [user, setUser] = useState();
  console.log(user);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Image
        source={{ uri: user?.picture }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 99,
        }}
      />
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
      }}>
        <View>
            <Text style={{ color: Colors.WHITE, fontSize: 16, fontFamily: 'Outfit' }}>Welcome,</Text>
            <Text
              style={{ color: Colors.WHITE, fontFamily: 'Outfit-bold', fontSize: 20 }}
            >
              {user?.given_name} {user?.family_name}
            </Text>
        </View>
        <Ionicons name='notifications' size={24} color='white' />
      </View>
    </View>
  );
}
