import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import {supabase} from '../../utils/SupaBaseConfig'
import { router, useRouter } from 'expo-router';

export default function InformationItems({ categoryData }) {
  const [totalCost, setTotalCost] = useState();
  const [totalPorcen, setTotalPorcen] = useState(0);
  const router =  useRouter()
  useEffect(() => {
    categoryData && calculateTotalPerc();
  }, [categoryData]);
  const calculateTotalPerc = () => {
    let totalPercentage = 0;
    categoryData?.CategoryItems?.forEach(item => {
      totalPercentage = totalPercentage + item.cost;
    });
    setTotalCost(totalPercentage);
    let perc = (totalPercentage / categoryData.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }
    setTotalPorcen(perc);
    console.log(perc);
  };
  const deleteCategory = () => {
    Alert.alert('Are you sure?', 'you really want to delete it', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('Category')
            .delete()
            .eq('category_id', categoryData.id);
          
            await supabase
            .from('Category') 
            .delete()
            .eq('id', categoryData.id)
            ToastAndroid.show('Category Deleted!', ToastAndroid.SHORT)
            router.replace('/(tabs)')
        },
        //delete the category here
      },
    ]);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconConatiner}>
          <Text
            style={[styles.textIcon, { backgroundColor: categoryData?.color }]}
          >
            {categoryData?.icon}
          </Text>
        </View>

        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryName}>{categoryData?.name}</Text>
          <Text style={styles.categoryItemText}>
            {categoryData?.CategoryItems?.length} Item
          </Text>
        </View>
        <TouchableOpacity onPress={() => deleteCategory()}>
          <Ionicons name='trash' size={24} color='red' />
        </TouchableOpacity>
      </View>
      {/* Progress bar */}
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: 'outfit-bold' }}>${totalCost}</Text>
        <Text style={{ fontFamily: 'outfit' }}>
          Total Budget: {categoryData?.assigned_budget}
        </Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View
          style={[
            styles.progresBarSubContainer,
            {
              width: totalPorcen + '%',
            },
          ]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textIcon: {
    fontSize: 25,
    padding: 20,
    borderRadius: 15,
  },
  iconConatiner: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  categoryName: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
  },
  categoryItemText: {
    fontFamily: 'outfit',
    fontSize: 16,
  },
  amountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  progressBarMainContainer: {
    width: '100%',
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 7,
  },
  progresBarSubContainer: {
    width: '40%',
    borderRadius: 99,
    height: 15,
    backgroundColor: Colors.PRIMARY,
  },
});
