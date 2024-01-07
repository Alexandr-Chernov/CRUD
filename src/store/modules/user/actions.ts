import { ActionTree } from 'vuex';
import { UserState, User } from './state';

interface Actions extends ActionTree<UserState, any> {
  saveUserList(context: any, newUserList: User[]): void;
  getUserIndexById(context: any, id: number): User;
  changeUserByUser(context: any, user: User): void;
  deleteUserByUser(context: any, user: User): void;
  createUserByUser(context: any, user: User): void;
}

const userIndexById = (state: any, id: number) => state
  .getters.userList.findIndex((user: User) => user.id === id);

const actions: Actions = {
  saveUserList(state, newUserList) {
    localStorage.setItem('users', JSON.stringify(newUserList));
  },
  getUserIndexById(state, id) {
    return userIndexById(state, id);
  },
  getUserById(state, id) {
    return state.getters.userList[userIndexById(state, id)];
  },
  changeUserByUser(state, user) {
    const userListBuffer = state.getters.userList;
    userListBuffer[userIndexById(state, user.id)] = user;
    state.dispatch('saveUserList', userListBuffer);
  },
  createUserByUser(state, user) {
    const userListBuffer = state.getters.userList;
    userListBuffer.push(user);
    state.dispatch('saveUserList', userListBuffer);
  },
  deleteUserByUser(state, user) {
    const userListBuffer = state.getters.userList;
    userListBuffer.splice(userIndexById(state, user.id), 1);
    state.dispatch('saveUserList', userListBuffer);
  },
};

export default actions;
