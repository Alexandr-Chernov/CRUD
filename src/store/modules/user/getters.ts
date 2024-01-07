import { GetterTree } from 'vuex';
import { UserState, User } from './state';

interface Getters extends GetterTree<UserState, any> {
  userList(state: UserState): User[];
}

const getters: Getters = {
  userList: (state) => state.userList,
};

export default getters;
