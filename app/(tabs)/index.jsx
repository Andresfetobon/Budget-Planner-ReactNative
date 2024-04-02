import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect } from 'react';
import service from '../../utils/services';
import { router, useRouter } from 'expo-router';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import { supabase } from '../../utils/SupaBaseConfig';

export default function home() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  const checkUserAuth = async () => {
    const result = await service.getData('login');
    if (result !== 'true') {
      router.replace('/login');
    }
  };

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData('login', 'false');
      router.replace('/login');
      // User was logged out
    }
  };

  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from('Category')
      .select('*')
      .eq('created_by', user.email);
    console.log('Data', data);
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text style={styles.text}>home Screen</Text>
      <Button title='logged out' onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 25,
  },
});
