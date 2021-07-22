/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/redux';
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <Toast
              ref={ref => Toast.setRef(ref)}
              topOffset={Math.max(20, insets?.top || 0)}
            />
          )}
        </SafeAreaInsetsContext.Consumer>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;
