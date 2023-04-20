import styled from "styled-components";
import Event from "../interfaces/Event";

const CardDiv = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h4 {
    margin: 0;
    padding: 0;
  }
`;

const Label = styled.label`
  width: max-content;
  color: tomato;
  font-size: 13px;
  border-bottom: 0.5px solid tomato;
  margin: 3px 0;
`;

const EventCard = (props: { eventData: Event }) => {
  const { name, description, time, date } = props.eventData.attributes;
  return (
    <CardDiv>
      <Label>Ивент</Label>
      <h4>{name}</h4>

      <Label>Описание</Label>
      {description}

      <Label>Время</Label>
      {time.slice(0, 5)}
      <Label>Дата</Label>
      {date}
    </CardDiv>
  );
};

export default EventCard;
