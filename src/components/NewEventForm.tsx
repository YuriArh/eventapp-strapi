import { useState } from "react";
import styled from "styled-components";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { motion } from "framer-motion";
import { useDropzone, FileWithPath } from "react-dropzone";

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

const CustomInput = styled.input`
  border: none;
  border-radius: 20px;
  background-color: rgba(230, 230, 230, 0.3);
  padding: 10px;
  outline: none;
`;
const CustomInputBlock = styled.div`
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

const Submit = styled(motion.input)`
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

const CustomMuiInputBlock = styled.div`
  background-color: rgba(230, 230, 230, 0.3);
  display: flex;
  align-items: center;
  width: 220px;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const DropZone = styled.div`
  border-radius: 20px;
  background-color: rgba(230, 230, 230, 0.3);
  padding: 10px;
  cursor: pointer;
  height: 100px;
  text-align: center;
  line-height: 75px;
  font-size: 14px;
  color: rgb(117, 117, 117);
`;

const NewEventForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const dispatch = useAppDispatch();
  let date = moment(selectedDate).format("YYYY-MM-DD");
  let time = moment(selectedTime).format("HH:mm:ss.SSS");

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <NewEventFormDiv>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addEventInfo({ name, description, date, time, acceptedFiles })
          );
          dispatch(openLocationInfo());
        }}
      >
        <Label>Title</Label>
        <CustomInput
          placeholder="Enter title here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // disableUnderline={true}
        />
        <Label>Description</Label>
        <Textarea
          placeholder="Enter description here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <Label>Time</Label>
        <PickerBlock>
          <DatePicker
            value={selectedDate}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <CustomInputBlock>
                <PickerInput ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </CustomInputBlock>
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
              <CustomInputBlock>
                <PickerInput ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </CustomInputBlock>
            )}
          />
        </PickerBlock>

        <Label>File</Label>
        <DropZone {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </DropZone>
        <Submit
          whileHover={{ scale: [1, 1.2] }}
          type={"submit"}
          value={"Select event location"}
        ></Submit>
      </Form>
    </NewEventFormDiv>
  );
};

export default NewEventForm;
