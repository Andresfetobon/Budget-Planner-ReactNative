import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../utils/SupaBaseConfig';
import { client } from '../utils/KindeConfig';
import { useRouter } from 'expo-router';

export default function addNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState('🏖️');
  const [selectedColor, setSelectedColor] = useState(Colors.GREEN);
  const [categoryName, setCategoryName] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreateCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from('Category')
      .insert([
        {
          name: categoryName,
          assigned_budget: totalBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();
    console.log(data);
    if (data) {
      router.replace({
        pathname: '/category-details',
        params: {
          categoryId: data[0].id,
        },
      });
      ToastAndroid.show('Category Created!', ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={value => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={color => setSelectedColor(color)}
        />
      </View>
      <View style={styles.inputView}>
        <MaterialIcons name='local-offer' size={24} color={Colors.GRAY} />
        <TextInput
          placeholder='Category Name'
          onChangeText={v => setCategoryName(v)}
          style={{ width: '100%', fontSize: 17 }}
        />
      </View>

      <View style={styles.inputView}>
        <FontAwesome name='dollar' size={27} color={Colors.GRAY} />
        <TextInput
          keyboardType='numeric'
          onChangeText={v => setTotalBudget(v)}
          placeholder='Total Budget'
          style={{ width: '100%', fontSize: 17 }}
        />
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        disabled={!categoryName || !totalBudget || loading}
        onPress={() => onCreateCategory()}
      >
        {loading ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text
            style={{ textAlign: 'center', fontSize: 17, color: Colors.WHITE }}
          >
            Create
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
  },
  addBtn: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 10,
    padding: 15,
  },
});
