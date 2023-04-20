interface EventData {
  name: string;
  desc?: string;
  time?: string;
  date?: string;
}

export default interface EventProp {
  eventData: EventData;
}
