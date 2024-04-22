import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import PieChart from 'react-native-pie-chart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { useState } from 'react';
import getPathFromState from 'expo-router/build/fork/getPathFromState';

export default function CircurlChart({ categoryDataList }) {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
  useEffect(() => {
    categoryDataList && updateCircularChart();
  }, [categoryDataList]);

  const updateCircularChart = () => {
    let totalEstimates = 0;
    setSliceColor([]);
    setValues([]);
    let otherCost = 0;
    categoryDataList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        item.CategoryItems?.forEach(item_ => {
          itemTotalCost = itemTotalCost + item_.cost;
          totalEstimates = totalEstimates + item_.cost
        });
        setSliceColor(sliceColor => [...sliceColor, Colors.COLORS_LIST[index]]);
        setValues(values => [...values, itemTotalCost]);
      } else {
        item.CategoryItems?.forEach(item_ => {
          otherCost = otherCost + item_.cost;
          totalEstimates = totalEstimates + item_.cost
        });
      }
      setTotalEstimatedCost(totalEstimates);
      setSliceColor(sliceColor => [...sliceColor, Colors.COLORS_LIST[4]]);
      setValues(values => [...values, otherCost]);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'outfit' }}>
        Total Estimated: <Text style={{ fontFamily: 'outfit-bold' }}>${totalEstimatedCost}</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.67}
          coverFill={'#FFF'}
        />
        {categoryDataList?.length === 0 ? (
          <View style={styles.chartNameContainer}>
            <MaterialCommunityIcons
              name='checkbox-blank-circle'
              size={24}
              color={Colors.GRAY}
            />
            <Text style={{ fontFamily: 'outfit-bold' }}>NA</Text>
          </View>
        ) : (
          <View>
            {categoryDataList?.map(
              (category, index) =>
                index <= 4 && (
                  <View key={index} style={styles.chartNameContainer}>
                    <MaterialCommunityIcons
                      name='checkbox-blank-circle'
                      size={24}
                      color={Colors.COLORS_LIST[index]}
                    />
                    <Text>{index < 4 ? category.name : 'Other'}</Text>
                  </View>
                )
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 40,
  },
  chartNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
});
