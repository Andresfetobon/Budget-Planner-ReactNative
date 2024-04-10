import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupaBaseConfig';
import { Ionicons } from '@expo/vector-icons';
import InformationItems from '../components/InformationItems/InformationItems';
import { useRouter } from 'expo-router';

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
    <View style={{ padding: 20, marginTop: 20 }}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name='arrow-back-circle' size={44} color='black' />
      </TouchableOpacity>
      <InformationItems categoryData={categoryData} />
    </View>
  );
}
