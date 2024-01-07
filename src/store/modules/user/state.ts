interface User {
  id: number;
  name: string;
}

interface UserState {
  userList: User[];
}

const defaultState: UserState = {
  userList: localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users') || '[]') as User[]
    : [] as User[],
};

export { User, UserState, defaultState };
