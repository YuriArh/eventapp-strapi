import { useState } from "react";
import Map, { GeolocateControl, Popup, Marker } from "react-map-gl";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

import { addEventLocale } from "../redux/features/newEventSlice";
import { getLocale } from "../redux/api/getLocaleApi";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import Event from "../interfaces/Event";
import { Viewport } from "../interfaces/MyMap";

import EventCard from "./EventCard";
import pin from "../icons/pin.png";

const MyImg = styled.img`
  width: 35px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledMap = styled(Map)`
  position: absolute;
  right: 0;
  float: right;
`;

const MyMap = () => {
  const token: string | undefined = process.env.REACT_APP_MAPBOX_TOKEN;
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const locationInfo = useAppSelector((state) => state.modal.locationInfo);

  const [popupID, setPopupID] = useState<Event["id"] | null>();
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 47,
    longitude: 13,
    zoom: 2,
  });

  const handleAddClick = (e: any) => {
    if (locationInfo) {
      const long = e.lngLat.lng;
      const lat = e.lngLat.lat;
      dispatch(getLocale({ long, lat }));
      dispatch(addEventLocale({ long, lat }));
    } else {
      return;
    }
  };

  return (
    <StyledMap
      initialViewState={viewport}
      style={{
        width: "100vw",
        height: "100vh",
        float: "right",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={token}
      minZoom={2}
      doubleClickZoom={false}
      onDblClick={(e) => handleAddClick(e)}
    >
      <GeolocateControl trackUserLocation={true} />
      {events.map((event, i) => {
        return (
          <>
            <Marker
              key={i}
              longitude={event.attributes.long}
              latitude={event.attributes.lat}
              // anchor="bottom"
              offset={[-3.5 * viewport.zoom, 7 * viewport.zoom]}
            >
              <MyImg src={pin} onClick={() => setPopupID(event.id)} />
            </Marker>
            {event.id === popupID && (
              <Popup
                key={event.id}
                latitude={event.attributes.lat}
                longitude={event.attributes.long}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setPopupID(null)}
                style={{}}
              >
                <EventCard eventData={event} />
              </Popup>
            )}
          </>
        );
      })}
    </StyledMap>
  );
};

export default MyMap;
