import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';
import { useRouter } from 'expo-router';

import React from 'react';

export default function CategoryList({ categoryDataList }) {
  const router = useRouter();
  const onCategoryClick = (category) => {
    router.push({
      pathname:'/category-details',
      params:{
        categoryId:category.id
      }
    })
  }
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}
      >
        Latest Budget
      </Text>
      <View>
        {categoryDataList?.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => onCategoryClick(category)}
          >
            <View style={styles.iconContainer}>
              <Text
                style={[styles.iconText, { backgroundColor: category.color }]}
              >
                {category.icon}
              </Text>
            </View>
            <View style={styles.subContainer}>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
                <Text style={styles.itemCount}>
                  {category.CategoryItems.length} Items
                </Text>
              </View>
              <Text style={styles.totalAmountText}>${category.assigned_budget}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 7,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconText: {
    fontSize: 35,
    padding: 16,
    borderRadius: 15,
  },
  categoryText: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  itemCount: {
    fontFamily: 'outfit',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  totalAmountText: {
    fontFamily: 'outfit-bold',
    fontSize: 17,
  },
});
