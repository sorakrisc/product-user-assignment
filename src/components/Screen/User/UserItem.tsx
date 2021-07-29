import {UserInterface} from '../../../redux/types/user.types';
import {StyleSheet, Switch, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as React from 'react';
import {memo} from 'react';

const UserItem = ({
  user,
  isActive,
  onToggleSwitch,
}: {
  user: UserInterface;
  isActive: boolean;
  onToggleSwitch: ({value, userId}: {value: boolean; userId: string}) => void;
}) => (
  <View style={styles.userItemContainer}>
    <FastImage
      style={{width: 50, height: 50, borderRadius: 25, marginRight: 15}}
      source={{
        uri: user.picture,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <Text>
          name: {[user.firstName, user.lastName].filter(Boolean).join(' ')}
        </Text>
        <Text>email: {user.email || '-'}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Switch
          onValueChange={value => onToggleSwitch({value, userId: user.id})}
          value={isActive}
        />
      </View>
    </View>
  </View>
);

// const areUserItemPropsEqual(prevProps, nextProps) {
//     return prevProps.label === nextProps.label;
// }

const styles = StyleSheet.create({
  userItemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
  },
});

// export default memo(UserItem, areUserItemPropsEqual);
export default memo(UserItem);
