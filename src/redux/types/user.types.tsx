import {FETCH_FAILURE, FETCH_REQUEST} from '../actions/user.actions';

export interface UserInterface {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export type DeactivateUserIdsType = string[];
// ACTION TYPES

export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';
export const UPDATE_USER_ACTIVATION_STATUS = 'UPDATE_USER_ACTIVATION_STATUS';

interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: {users: UserInterface[]; page: number};
}

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: UserInterface;
}
interface UpdateUserListAction {
  type: typeof UPDATE_USER_LIST;
  payload: UserInterface[];
}

interface UpdateUserActivationStatus {
  type: typeof UPDATE_USER_ACTIVATION_STATUS;
  payload: {userId: string; status: boolean};
}

interface FetchUserFail {
  type: typeof FETCH_FAILURE;
  payload: any;
}
interface FetchUserRequest {
  type: typeof FETCH_REQUEST;
}

export type UserActionTypes =
  | FetchUserAction
  | UpdateUserAction
  | UpdateUserListAction
  | UpdateUserActivationStatus
  | FetchUserFail
  | FetchUserRequest;
