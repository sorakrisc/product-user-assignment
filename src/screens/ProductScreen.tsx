import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MyTextInput from '../components/General/MyTextInput';
import MyButton from '../components/General/MyButton';
import MySafeAreaView from '../components/General/MySafeAreaView';
import {useDispatch} from 'react-redux';
import {addProduct} from '../redux/actions';
import {v4 as uuidV4} from 'uuid';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

export interface Props {
  //name: string;
}

const ProductScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const clearInput = () => {
    setName('');
    setDescription('');
    setPrice('');
  };

  const onSubmit = () => {
    if (/^[0-9]+([.][0-9]+){0,1}$/.test(price)) {
      const sanitizePrice = Number.parseFloat(price);
      if (sanitizePrice >= 0) {
        dispatch(
          addProduct({
            id: uuidV4(),
            name,
            description,
            price: sanitizePrice,
          }),
        );
        clearInput();
        Toast.show({
          type: 'success',
          text1: 'Added ✅',
          text2: 'Product is added to the catalog.',
          onPress: () => {
            navigation.navigate('Catalog');
            Toast.hide();
          },
        });
      }
    } else {
      //set system msg wrong price format
      Toast.show({
        type: 'error',
        text1: 'This is some something 👋',
        text2: 'Please Re-check your inputs.',
      });
    }
  };
  return (
    <MySafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <MyTextInput
          label={'Name'}
          textInputProps={{
            style: styles.myTextInput,
            value: name,
            onChangeText: text => {
              setName(text);
            },
          }}
        />
        <MyTextInput
          label={'Description'}
          textInputProps={{
            style: styles.myTextInput,
            value: description,
            onChangeText: text => {
              setDescription(text);
            },
          }}
        />
        <MyTextInput
          label={'Price'}
          textInputProps={{
            style: styles.myTextInput,
            keyboardType: 'decimal-pad',
            value: price,
            onChangeText: text => {
              setPrice(text);
            },
          }}
        />
        <MyButton
          buttonProps={{
            title: 'Submit',
            onPress: onSubmit,
            disabled: !(
              name.length > 0 &&
              price.length > 0 &&
              description.length > 0
            ),
          }}
        />
      </ScrollView>
    </MySafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  myTextInput: {
    marginBottom: 20,
  },
});
