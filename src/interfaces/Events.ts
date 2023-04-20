import Event from "./Event";
export interface eventsState {
  events: Event[];
  isLoading: boolean;
  hasError: boolean;
}
