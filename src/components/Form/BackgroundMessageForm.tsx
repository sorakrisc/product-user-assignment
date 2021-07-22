import * as React from 'react';
import {Text, View} from 'react-native';

export interface Props {
  //name: string;
}

const BackgroundMessageForm: React.FC<Props> = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Sorry, it is empty</Text>
    </View>
  );
};

export default BackgroundMessageForm;
