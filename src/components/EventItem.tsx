import styled from "styled-components";
import EventProp from "../interfaces/EventCard";

const EventDiv = styled.div`
  height: 100px;
  border: 1px solid black;
  display: flex;
  padding: 10px;
  h4 {
    margin: 0;
    padding: 0;
  }
`;

const Name = styled.div`
  margin: 0;
  padding: 0;
`;

const Desc = styled.div``;

const Time = styled.div``;

const Label = styled.label`
  width: max-content;
  color: tomato;
  font-size
  border-bottom: 0.5px solid tomato;
  margin: 3px 0;
`;

const EventItem = (props: EventProp) => {
  return (
    <EventDiv>
      <Label>Ивент</Label>
      <h4>{props.eventData.name}</h4>

      <Label>Описание</Label>
      {props.eventData.desc}

      <Label>Время</Label>
      {props.eventData.time}
      <Label>Дата</Label>
      {props.eventData.date}
    </EventDiv>
  );
};

export default EventItem;
