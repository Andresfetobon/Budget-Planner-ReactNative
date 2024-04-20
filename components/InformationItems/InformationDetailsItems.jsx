import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

export default function InformationDetailsItems({ categoryData }) {
  console.log(categoryData);
  return (
    
      <View style={styles.container}>
        <Text style={styles.titleHeading}>Item List</Text>
        <View style={{ marginTop: 15 }}>
          {categoryData?.CategoryItems?.length>0? categoryData?.CategoryItems?.map((item, index) => (
            <>
            <View key={index} style={styles.containerArticles}>
              <Image
                source={{ uri: item.image }}
                style={styles.containerImage}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.url}>{item.url}</Text>
              </View>
              <Text style={styles.cost}>${item.cost}</Text>
            </View>
            {categoryData?.CategoryItems.length - 1 != index && 
              <View style={{ borderWidth: 0.5, borderColor: Colors.GRAY, marginTop: 10 }}></View>
            }
            </>
          )):
          <Text style={styles.noItemContainer}>Not item found</Text>
          }
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleHeading: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  containerImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    marginTop: 15
  },
  containerArticles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  url: {
    fontFamily: 'outfit',
    color: '#6B748C',
  },
  cost: {
    fontSize: 17,
    fontFamily: 'outfit-bold',
    marginLeft: 10,
  },
  noItemContainer: {
    fontFamily: 'outfit-bold',
    fontSize:25,
    color: Colors.GRAY
  }
});
