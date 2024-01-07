import { MutationTree } from 'vuex';
import { User, UserState } from './state';

interface Mutations extends MutationTree<UserState> {
  USERLIST_UPDATE(state: UserState, newUserList: User[]): void;
}

const mutations: Mutations = {
  USERLIST_UPDATE(state, newUserList) {
    state.userList = newUserList;
  },
};

export default mutations;
