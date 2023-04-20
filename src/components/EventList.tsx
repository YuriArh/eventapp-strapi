import styled from "styled-components";
import EventItem from "./EventItem";
import Event from "../interfaces/Event";

const EventListDiv = styled.div`
  height: 100vh;
  width: 25vw;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 0;
`;

const EventList = (props: Event[]) => {
  return (
    <EventListDiv>
      {/* {props.data?.map((item) => {
        return <EventItem key={item.eventId} eventData={item} />;
      })} */}
    </EventListDiv>
  );
};

export default EventList;
