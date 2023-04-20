import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import reset from "styled-reset";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHook";
import { createEvent } from "./redux/api/postApi";
import { getEvents } from "./redux/api/getApi";

import Button from "./components/Button";
import MyMap from "./components/MyMap";
import LayoutModal from "./components/LayoutModal";
import NewEventForm from "./components/NewEventForm";
import LocationInfo from "./components/LocationInfo";
import Loader from "./components/Loader";
import EventList from "./components/EventList";
import "./App.css";

const AppStyle = createGlobalStyle`
${reset}

* { @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap');
font-family: Roboto !important; box-sizing: border-box;}
body {
  overflow: hidden;
}
`;

const AppDiv = styled.div`
  position: relative;
  height: 100vh;
`;

function App() {
  const dispatch = useAppDispatch();

  const modal = useAppSelector((state) => state.modal.modal);
  const locationInfo = useAppSelector((state) => state.modal.locationInfo);
  const newEventData = useAppSelector((state) => state.newEvent.data);
  const isPosting = useAppSelector((state) => state.newEvent.isPosting);
  const isLoading = useAppSelector((state) => state.events.isLoading);

  const handleCLick = () => {
    console.log(newEventData);
    dispatch(createEvent(newEventData));
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [isPosting, !isPosting]);

  return (
    <AppDiv>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AppStyle />
        <MyMap />
        {/* <EventList data={data} /> */}
        <AnimatePresence>
          {!modal && !locationInfo && <Button />}
        </AnimatePresence>

        <AnimatePresence>
          {modal && <LayoutModal>{<NewEventForm />}</LayoutModal>}
        </AnimatePresence>
        <AnimatePresence>
          {locationInfo && <LocationInfo onLocationButton={handleCLick} />}
        </AnimatePresence>
        {(isLoading || isPosting) && <Loader />}
      </LocalizationProvider>
    </AppDiv>
  );
}

export default App;
