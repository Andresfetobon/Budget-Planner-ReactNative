import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect } from 'react';
import { Link, router, useRouter } from 'expo-router';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';
import CircurlChart from '../../components/CircurlChart';
import { Ionicons } from '@expo/vector-icons';
export default function home() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  const checkUserAuth = async () => {
    const result = await services.getData('login');
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
        marginTop: 40,
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: 150,
        }}
      >
        {/* <Text style={styles.text}>home Screen</Text>
      <Button title='logout' onPress={handleLogout} /> */}
        <Header />
        <CircurlChart />
      </View>
      <Link href={'/add-new-category'} style={styles.adBtnContainer}>
        <Ionicons name='add-circle' size={67} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 25,
  },
  adBtnContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
});
