import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import UserScreen from '../screens/UserScreen';
import CatalogScreen from '../screens/CatalogScreen';

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <MainTabNavigator />
  </NavigationContainer>
);

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'Product'} component={ProductScreen} />
      <Tab.Screen name={'Catalog'} component={CatalogScreen} />
      <Tab.Screen name={'Users'} component={UserScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
