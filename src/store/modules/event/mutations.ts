import { MutationTree } from 'vuex';
import { Event, EventState } from './state';

interface Mutations extends MutationTree<EventState> {
  EVENTLIST_UPDATE(state: EventState, newUserList: Event[]): void;
  LASTEVENT_UPDATE(state: EventState, newLastEvent: Event): void;
}

const mutations: Mutations = {
  EVENTLIST_UPDATE(state, newEventList) {
    state.eventList = newEventList;
  },
  LASTEVENT_UPDATE(state, newLastEvent) {
    state.lastEvent = newLastEvent;
  },
};

export default mutations;
