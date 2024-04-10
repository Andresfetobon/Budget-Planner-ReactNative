import { View, Text, StyleSheet, Button, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router, useRouter } from 'expo-router';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';
import CircurlChart from '../../components/CircurlChart';
import { Ionicons } from '@expo/vector-icons';
import CategoryList from '../../components/CategoryList';

export default function home() {
  const router = useRouter();
  const [categoryDataList, setCategoryDataList] = useState();
  const [loading, setLoading ] = useState(false)

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

  const getCategoryList = async () => {
    setLoading(true)
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('created_by', user.email);

    setCategoryDataList(data);
    data&&setLoading(false)
  };

  return (
    <View
      style={{
        marginTop: 40,
        flex: 1,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: Colors.PRIMARY,
            height: 150,
          }}
        >
          <Header />
        </View>
        <View style={{ padding: 20, marginTop: -75 }}>
          <CircurlChart />
          <CategoryList categoryDataList={categoryDataList} />
        </View>
      </ScrollView>
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
    right: 16,
    elevation: 10,
  },
});
