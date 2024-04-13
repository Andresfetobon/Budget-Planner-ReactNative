import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import { supabase } from '../utils/SupaBaseConfig'
const placeholder =
  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export default function addNewCategoryItem() {
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [cost, setCost] = useState();
  const [note, setNote] = useState();

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const onClickAdd = async () => {
    const filName = Date.now();
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filName + '.png', decode(image), {
        contentType: 'image/png',
      });
      if(data){
        const fileUrl = 'https://iekizkkusjfsusgezwyq.supabase.co/storage/v1/object/public/images/' + data.path;
        console.log(fileUrl)
      }

  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image source={{ uri: previewImage }} style={styles.imageContainer} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Ionicons name='pricetag' size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            placeholder='Item Name'
            onChangeText={value => setName(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome5 name='dollar-sign' size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={value => setCost(value)}
            placeholder='Cost'
          />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons name='link' size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            placeholder='Url'
            onChangeText={value => setUrl(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons name='pencil' size={24} color={Colors.GRAY} />
          <TextInput
            style={styles.input}
            placeholder='Note'
            onChangeText={value => setNote(value)}
            numberOfLines={3}
          />
        </View>
        <TouchableOpacity 
        onPress={() => onClickAdd()}
        disabled={!name || !cost} style={styles.button}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
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
  input: {
    fontSize: 17,
    width: '100%',
  },
  button: {
    padding: 17,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 25,
  },
});
