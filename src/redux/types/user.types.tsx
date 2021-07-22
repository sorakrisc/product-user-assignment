export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
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

export type UserActionTypes =
  | FetchUserAction
  | UpdateUserAction
  | UpdateUserListAction
  | UpdateUserActivationStatus;
