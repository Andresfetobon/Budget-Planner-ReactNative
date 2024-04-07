import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import PieChart from 'react-native-pie-chart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { useState } from 'react';

export default function CircurlChart() {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'outfit' }}>
        Total Estimated: <Text style={{ fontFamily: 'outfit-bold' }}>0$</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.67}
          coverFill={'#FFF'}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
          }}
        >
          
          <MaterialCommunityIcons
            name='checkbox-blank-circle'
            size={24}
            color={Colors.GRAY}
          />
          <Text style={{ fontFamily: 'outfit-bold' }}>NA</Text>
        </View>
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
});
