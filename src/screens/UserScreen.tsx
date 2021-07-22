import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import MySafeAreaView from '../components/General/MySafeAreaView';
import {DeactivateUserIdsType, UserInterface} from '../redux/types/user.types';
import FastImage from 'react-native-fast-image';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {
  fetchUser,
  updateUserActivationStatus,
} from '../redux/actions/user.actions';
import {Switch} from 'react-native';
import BackgroundMessageForm from '../components/Form/BackgroundMessageForm';

export interface Props {
  //name: string;
}

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
        uri: user.image,
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

const UserScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {
    storeUser,
    storeDeactivateUserIds,
    storeIsAllUserLoaded,
  }: {
    storeUser: UserInterface[];
    storeDeactivateUserIds: DeactivateUserIdsType;
    storeIsAllUserLoaded: boolean;
  } = useSelector((state: RootState) => ({
    storeUser: state.users.users,
    storeDeactivateUserIds: state.users.deactivateUserIds,
    storeIsAllUserLoaded: state.users.isAllUserLoaded,
  }));

  const [refreshing, setRefreshing] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    initialiseList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRefreshing(false);
    setLoadingMore(false);
  }, [storeUser]);

  const onRefresh = () => {
    setLoadingMore(false);
    setRefreshing(true);
    initialiseList();
  };

  const initialiseList = () => {
    dispatch(fetchUser());
  };

  const loadMoreUser = () => {
    // if already loading more, or all loaded, return
    if (loadingMore || storeIsAllUserLoaded) return;

    const storeUserLength = storeUser.length;
    // set loading more (also updates footer text)
    setLoadingMore(true);

    dispatch(fetchUser(storeUserLength / 10));
  };

  const onToggleSwitch = ({
    value,
    userId,
  }: {
    value: boolean;
    userId: string;
  }) => {
    dispatch(updateUserActivationStatus(userId, value));
  };

  return (
    <MySafeAreaView>
      <FlatList
        data={storeUser}
        renderItem={({item}: {item: UserInterface}) =>
          UserItem({
            user: item,
            onToggleSwitch,
            isActive: !storeDeactivateUserIds.includes(item.id),
          })
        }
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          <View>
            {loadingMore && !storeIsAllUserLoaded && (
              <Text>Loading More...</Text>
            )}
          </View>
        }
        removeClippedSubviews
        scrollEventThrottle={250}
        onEndReached={() => {
          loadMoreUser();
        }}
        onEndReachedThreshold={0.01}
        ListEmptyComponent={<BackgroundMessageForm />}
        contentContainerStyle={{flexGrow: 1}}
      />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
  },
});
export default UserScreen;
