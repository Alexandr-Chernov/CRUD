import { defaultState } from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  state: defaultState,
  getters,
  mutations,
  actions,
} as const;
