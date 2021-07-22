import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import MySafeAreaView from '../components/General/MySafeAreaView';
import {RootState} from '../redux';
import {ProductInterface} from '../redux/types/catalog.types';
import BackgroundMessageForm from '../components/Form/BackgroundMessageForm';

export interface Props {
  //name: string;
}

const CatalogItem = (product: ProductInterface) => (
  <View style={styles.catalogItemContainer}>
    <Text>name: {product.name || '-'}</Text>
    <Text>description: {product.description || '-'}</Text>
    <Text>price: {product.price >= 0 ? product.price : '-'}</Text>
  </View>
);
const CatalogScreen: React.FC<Props> = props => {
  const catalog = useSelector((state: RootState) => state.catalog);

  return (
    <MySafeAreaView>
      <FlatList
        data={catalog}
        renderItem={({item}: {item: ProductInterface}) => CatalogItem(item)}
        keyExtractor={item => item.id}
        ListEmptyComponent={<BackgroundMessageForm />}
        contentContainerStyle={{flexGrow: 1}}
      />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  catalogItemContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
});
export default CatalogScreen;
