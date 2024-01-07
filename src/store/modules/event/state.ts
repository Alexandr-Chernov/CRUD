interface Event {
  eventName: string;
  data: any;
}

interface EventState {
  eventList: Event[];
  lastEvent: Event;
}

const defaultState = {
  eventList: localStorage.getItem('events')
    ? JSON.parse(localStorage.getItem('events') || '[]') as Event[]
    : [],
  lastEvent: localStorage.getItem('last_event')
    ? JSON.parse(localStorage.getItem('last_event') || '') as Event
    : {} as Event,
};

export { Event, EventState, defaultState };
