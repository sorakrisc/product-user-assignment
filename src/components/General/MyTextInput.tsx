import * as React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

export interface Props {
  //name: string;
  label: string;
  textInputProps?: TextInputProps;
}

const MyTextInput: React.FC<Props> = props => {
  return (
    <View>
      {props.label ? <Text>{props.label}</Text> : null}
      <TextInput
        {...props.textInputProps}
        style={[styles.textInput, props.textInputProps?.style]}
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    backgroundColor: 'white',
    padding: 10,
  },
});
