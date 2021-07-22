import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaViewProps} from 'react-native-safe-area-context';

export interface Props {
  //name: string;
  safeAreaViewProps?: SafeAreaViewProps;
}

const MySafeAreaView: React.FC<Props> = props => {
  return (
    <SafeAreaView
      {...props.safeAreaViewProps}
      style={[styles.safeAreaView, props.safeAreaViewProps?.style]}>
      {props.children}
    </SafeAreaView>
  );
};

export default MySafeAreaView;

const styles = StyleSheet.create({
  safeAreaView: {
    maxWidth: 600,
    flex: 1,
  },
});
