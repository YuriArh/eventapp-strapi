export default interface Event {
  id: number;
  attributes: {
    name: string;
    long: number;
    lat: number;
    img: any;
    description: string;
    date: string;
    time: string;
  };
}
