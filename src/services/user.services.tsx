import {UserInterface} from '../redux/types/user.types';
import {v4 as uuidV4} from 'uuid';

export const userService = {
  fetchUser,
};

async function fetchUser(page = 0, pageSize = 10): Promise<UserInterface[]> {
  // return await getFromServer('/api/');
  return mock({success: true, timeout: 1000, page, pageSize});
}

const mock = ({
  success,
  timeout,
  page,
  pageSize,
}: {
  success: boolean;
  timeout: number;
  page: number;
  pageSize: number;
}) =>
  new Promise<UserInterface[]>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(paginateUsers({page, pageSize, allUsers: userMockData}));
      } else {
        reject({error: 'there is an error'});
      }
    }, timeout);
  });

const paginateUsers = ({
  page,
  allUsers,
  pageSize,
}: {
  page: number;
  allUsers: UserInterface[];
  pageSize: number;
}) => {
  let obj = [];
  const startingIdx = page * pageSize;
  for (let i = startingIdx; i < startingIdx + pageSize; i++) {
    if (allUsers[i] === undefined) break;

    obj.push(allUsers[i]);
  }
  return obj;
};

const userMockData: any = [
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'BlueBik',
    lastName: 'Group',
    email: 'test@bluebik.com',
    image:
      'https://bluebik.com/wp-content/uploads/2019/11/Untitled-1-01-150x150.png',
  },
  {
    id: uuidV4(),
    firstName: 'GG',
    lastName: 'Group',
    email: 'test@gmail.com',
    image: 'https://google.com/favicon.ico',
  },
  {
    id: uuidV4(),
    firstName: 'GG',
    lastName: 'Group',
    email: 'test@gmail.com',
    image: 'https://google.com/favicon.ico',
  },
  {
    id: uuidV4(),
    firstName: 'GG',
    lastName: 'Group',
    email: 'test@gmail.com',
    image: 'https://google.com/favicon.ico',
  },
  {
    id: uuidV4(),
    firstName: 'GG',
    lastName: 'Group',
    email: 'test@gmail.com',
    image: 'https://google.com/favicon.ico',
  },
];
