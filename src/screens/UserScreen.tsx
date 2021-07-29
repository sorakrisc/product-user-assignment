import * as React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import MySafeAreaView from '../components/General/MySafeAreaView';
import {DeactivateUserIdsType, UserInterface} from '../redux/types/user.types';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {
  fetchUser,
  updateUserActivationStatus,
} from '../redux/actions/user.actions';
import BackgroundMessageForm from '../components/Form/BackgroundMessageForm';
import UserItem from '../components/Screen/User/UserItem';

export interface Props {
  //name: string;
}

const UserScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {
    storeUser,
    storeDeactivateUserIds,
    storeIsAllUserLoaded,
    storeFetchStatus,
  }: {
    storeUser: UserInterface[];
    storeDeactivateUserIds: DeactivateUserIdsType;
    storeIsAllUserLoaded: boolean;
    storeFetchStatus: boolean;
  } = useSelector((state: RootState) => ({
    storeUser: state.users.users,
    storeDeactivateUserIds: state.users.deactivateUserIds,
    storeIsAllUserLoaded: state.users.isAllUserLoaded,
    storeFetchStatus: state.users.fetchStatus,
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

  useEffect(() => {
    if (refreshing && !storeFetchStatus) {
      setRefreshing(false);
    }
  }, [storeFetchStatus]); // eslint-disable-line react-hooks/exhaustive-deps

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
        renderItem={({item}: {item: UserInterface}) => (
          <UserItem
            user={item}
            onToggleSwitch={onToggleSwitch}
            isActive={!storeDeactivateUserIds.includes(item.id)}
          />
        )}
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

export default UserScreen;
