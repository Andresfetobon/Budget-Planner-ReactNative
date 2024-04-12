import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const placeholder =
  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export default function addNewCategoryItem() {
  const [image, setImage] = useState(placeholder);
  const [PreviewImage, setPreviewImage] = useState()

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true
    });

    
    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => onImagePick()}>
        <Image source={{ uri: PreviewImage }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textInputContainer}>
        <Ionicons name='pricetag' size={24} color={Colors.GRAY} />
        <TextInput placeholder='Item Name' styles={styles.inputText} />
      </View>
      <View style={styles.textInputContainer}>
        <FontAwesome5 name='dollar-sign' size={24} color={Colors.GRAY} />
        <TextInput placeholder='Cost' styles={styles.inputText} />
      </View>
      <View style={styles.textInputContainer}>
        <Ionicons name='link' size={24} color={Colors.GRAY} />
        <TextInput placeholder='Url' styles={styles.inputText} />
      </View>
      <View style={styles.textInputContainer}>
        <Ionicons name='pencil' size={24} color={Colors.GRAY} />
        <TextInput
          placeholder='Note'
          styles={styles.inputText}
          numberOfLines={3}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontSize: 17,
            fontFamily: 'outfit-bold',
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.GRAY,
    marginTop: 10,
  },
  inputText: {
    fontSize: 17,
  },
  button: {
    padding: 17,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 25,
  },
});
