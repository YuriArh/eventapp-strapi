import { useState } from "react";
import styled from "styled-components";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { motion } from "framer-motion";

import { useAppDispatch } from "../hooks/reduxHook";
import { openLocationInfo } from "../redux/features/modalSlice";
import { addEventInfo } from "../redux/features/newEventSlice";

// import "react-calendar/dist/Calendar.css";

const NewEventFormDiv = styled.div`
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  background-color: rgba(230, 230, 230, 0.3);
  padding: 10px;
  outline: none;
`;
const InputBlock = styled.div`
  background-color: rgba(230, 230, 230, 0.3);
  display: flex;
  align-items: center;
  width: 220px;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const Label = styled.label`
  color: black;
  font-weight: 500;
  font-family: "Roboto";
  margin: 15px 0 5px 0;
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
  border-radius: 20px;
  background-color: rgba(230, 230, 230, 0.3);
  padding: 10px;
  outline: none;
`;

const PickerBlock = styled.div`
  display: flex;
`;

const PickerInput = styled.input`
  border: none;
  border-radius: 20px;
  background-color: transparent;
  padding: 10px;
  outline: none;
`;

const Button = styled(motion.input)`
  background-color: black;
  border-radius: 20px;
  width: 40%;
  padding: 10px;
  color: white;
  margin: 30px auto 20px auto;

  &:hover {
    cursor: pointer;
  }
`;

const NewEventForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const dispatch = useAppDispatch();
  let date = moment(selectedDate).format("YYYY-MM-DD");
  let time = moment(selectedTime).format("HH:mm:ss.SSS");
  console.log(time);
  return (
    <NewEventFormDiv>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addEventInfo({ name, desc, date, time }));
          dispatch(openLocationInfo());
        }}
      >
        <Label>Title</Label>
        <Input
          placeholder="Введите название ивента"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Описание</Label>
        <Textarea
          placeholder="Введите описание ивента"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></Textarea>
        <Label>Время</Label>
        <PickerBlock>
          <DatePicker
            value={selectedDate}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <InputBlock>
                <PickerInput ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </InputBlock>
            )}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            // disableOpenPicker={true}
          />
          {/* <Calendar value={selectedDate} onChange={setSelectedDate} /> */}
          <TimePicker
            value={selectedTime}
            onChange={(newValue) => {
              setSelectedTime(newValue);
            }}
            ampm={false}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <InputBlock>
                <PickerInput ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </InputBlock>
            )}
          />
        </PickerBlock>

        <input type={"file"} hidden></input>

        <Button
          whileHover={{ scale: [1, 1.2] }}
          type={"submit"}
          value={"Выберите местоположение ивента"}
        ></Button>
      </Form>
    </NewEventFormDiv>
  );
};

export default NewEventForm;
