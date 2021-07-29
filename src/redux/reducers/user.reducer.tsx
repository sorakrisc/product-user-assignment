// Action Types
import {
  DeactivateUserIdsType,
  FETCH_USER,
  UPDATE_USER,
  UPDATE_USER_ACTIVATION_STATUS,
  UPDATE_USER_LIST,
  UserActionTypes,
  UserInterface,
} from '../types/user.types';
import _ from 'lodash';
import {FETCH_FAILURE, FETCH_REQUEST} from '../actions/user.actions';
// reducer

const initialState: {
  users: UserInterface[];
  deactivateUserIds: DeactivateUserIdsType;
  isAllUserLoaded: boolean;
  fetchStatus: boolean;
} = {
  users: [],
  deactivateUserIds: [],
  isAllUserLoaded: false,
  fetchStatus: true,
};

function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case FETCH_USER:
      let nextUsers: UserInterface[] = state.users;
      const {page, users} = action.payload;

      if (page > 0) {
        // page higher than 0 append to list not deleting the prev users
        if (users.length > 0) {
          // update user with next page data
          nextUsers = _.uniqBy([...state.users, ...users], 'id');
        } else {
          // no user to update return state aka do nothing
          return {
            ...state,
            isAllUserLoaded: true,
          };
        }
      } else {
        // page is 0 or lower refresh reset list
        nextUsers = users;
      }
      return {
        ...state,
        users: nextUsers,
        isAllUserLoaded: false,
      };

    case UPDATE_USER:
      const user = action.payload;
      // @ts-ignore
      const userID = user.id;

      return {
        ...state,
        users: state.users.map(obj => (obj.id === userID ? user : obj)),
      };

    case UPDATE_USER_LIST:
      return {...state, users: action.payload};

    case UPDATE_USER_ACTIVATION_STATUS:
      const {userId, status} = action.payload;
      let newDeactivateUserIds = [...state.deactivateUserIds];
      if (status) {
        //activating user remove from deactivateUserIds
        newDeactivateUserIds = newDeactivateUserIds.filter(d => d !== userId);
      } else {
        //deactivating user append to deactivateUserIds
        newDeactivateUserIds.push(userId);
      }
      return {
        ...state,
        deactivateUserIds: newDeactivateUserIds,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        fetchStatus: true,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        fetchStatus: false,
      };

    default:
      return state;
  }
}

export default userReducer;
