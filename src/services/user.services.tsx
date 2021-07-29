import {UserInterface} from '../redux/types/user.types';
import axios from 'axios';

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '61021c0ea5c5f841d073e310';

export const userService = {
  fetchUser,
};

async function fetchUser(page = 0, pageSize = 10): Promise<UserInterface[]> {
  return new Promise<UserInterface[]>((resolve, reject) => {
    axios
      .get(`${BASE_URL}/user?page=${page}&limit=${pageSize}`, {
        headers: {'app-id': APP_ID},
      })
      .then(res => {
        const data = res?.data?.data;
        if (data?.length > 0) {
          resolve(data);
        } else {
          throw 'data error';
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
