import {ActionCreator} from 'redux';
import {
  FETCH_USER,
  UPDATE_USER,
  UPDATE_USER_ACTIVATION_STATUS,
  UPDATE_USER_LIST,
  UserActionTypes,
  UserInterface,
} from '../types/user.types';
import {userService} from '../../services/user.services';
import {Dispatch} from 'redux';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_FAILURE = 'FETCH_FAILURE';

interface FetchRequestAction {
  type: typeof FETCH_REQUEST;
}

interface FetchFailureAction {
  type: typeof FETCH_FAILURE;
  payload: any;
}

export type FetchActionTypes = FetchRequestAction | FetchFailureAction;

export const request: ActionCreator<FetchActionTypes> = () => {
  return {type: FETCH_REQUEST};
};
export const failure: ActionCreator<FetchActionTypes> = (error: any) => {
  return {type: FETCH_FAILURE, payload: error};
};

const updateStoredUsersSuccess: ActionCreator<UserActionTypes> = ({
  page,
  users,
}: {
  page: number;
  users: UserInterface[];
}) => {
  return {type: FETCH_USER, payload: {page, users}};
};

export function fetchUser(page = 0) {
  return (dispatch: Dispatch) => {
    // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(request());
    return userService.fetchUser(page).then(
      response => {
        dispatch(
          updateStoredUsersSuccess({
            page,
            users: response.map((r: UserInterface) => {
              return r;
            }),
          }),
        );
      },
      () => {
        dispatch(failure('Server error.'));
      },
    );
  };
}

export function updateUserList(users: UserInterface[]) {
  return {
    type: UPDATE_USER_LIST,
    payload: users,
  };
}

export function updateUser(user: UserInterface) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function updateUserActivationStatus(userId: string, status: boolean) {
  return {
    type: UPDATE_USER_ACTIVATION_STATUS,
    payload: {
      userId,
      status,
    },
  };
}

