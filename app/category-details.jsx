import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupaBaseConfig';
import { Ionicons } from '@expo/vector-icons';
import InformationItems from '../components/InformationItems/InformationItems';
import { useRouter } from 'expo-router';
import InformationDetailsItems from '../components/InformationItems/InformationDetailsItems';
import Colors from '../utils/Colors';

export default function categoryDetails() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState();
  useEffect(() => {
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('id', categoryId);
    setCategoryData(data[0]);
    console.log('Cat:', data);
  };

  return (
    <View style={{ padding: 20, marginTop: 20, flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons
          style={{ marginTop: 5 }}
          name='arrow-back-circle'
          size={44}
          color='black'
        />
      </TouchableOpacity>
      <InformationItems categoryData={categoryData} />
      <InformationDetailsItems categoryData={categoryData} />

      <Link
      href={{
        pathname: '/add-new-category-item'
      }}
      style={styles.btnFloating}>
        <Ionicons name='add-circle' size={67} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  btnFloating: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
