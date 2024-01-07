import { GetterTree } from 'vuex';
import { EventState, Event } from './state';

interface Getters extends GetterTree<EventState, any> {
  eventList(state: EventState): Event[];
  lastEvent(state: EventState): Event;
}

const getters: Getters = {
  eventList: (state) => state.eventList,
  lastEvent: (state) => state.lastEvent,
};

export default getters;
