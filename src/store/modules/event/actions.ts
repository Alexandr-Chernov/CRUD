import { ActionTree } from 'vuex';
import { EventState, Event } from './state';

interface Actions extends ActionTree<EventState, any> {
  saveEventList(context: any, newEventList: Event[]): void;
  saveLastEvent(context: any, newLastEvent: Event): void;
  removeLastEvent(context: any): void;
  pushEventList(context: any, newEvent: Event): void;
  popEventList(context: any): void;
}

const actions: Actions = {
  saveEventList(state, newEventList) {
    localStorage.setItem('events', JSON.stringify(newEventList));
  },
  saveLastEvent(state, newLastEvent) {
    localStorage.setItem('last_event', JSON.stringify(newLastEvent));
  },
  removeLastEvent(state) {
    localStorage.removeItem('last_event');
  },
  pushEventList(state, newEvent) {
    const eventListBuffer = state.getters.eventList;
    eventListBuffer.push(newEvent);
    state.dispatch('saveEventList', eventListBuffer);
  },
  popEventList(state) {
    const eventListBuffer = state.getters.eventList;
    const pop = eventListBuffer.pop();
    state.dispatch('saveEventList', eventListBuffer);
    return pop;
  },
};

export default actions;
