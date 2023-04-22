import styled from "styled-components";
import { motion } from "framer-motion";

import { closeLocationInfo } from "../redux/features/modalSlice";
import { cancelAddingEvent } from "../redux/features/newEventSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import okIcon from "../icons/icons8-done.svg";
import closeIcon from "../icons/icons8-close.svg";

const Div = styled(motion.div)`
  position: absolute;

  width: 600px;
  bottom: 0;
  background-color: white;
  left: calc(50vw - 300px);
  height: 50px;
  z-index: 3;
  border-radius: 25px 25px 0 0;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
`;
const Input = styled.input`
  border: none;
  border-radius: 20px;
  background-color: rgba(230, 230, 230, 0.5);
  padding: 10px;
  width: 80%;
  outline: none;
`;

const Button = styled(motion.button)`
  background: linear-gradient(to right, #fd746c, #ff9068);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px white;

  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 100%;
  color: white;
`;

type Props = {
  onLocationButton: () => void;
};

const LocationInfo = (props: Props) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.locale.locale);

  const handleDoneClick = () => {
    dispatch(closeLocationInfo());
    props.onLocationButton();
    dispatch(cancelAddingEvent());
  };

  const handleCloseClick = () => {
    dispatch(cancelAddingEvent());
    dispatch(closeLocationInfo());
  };

  return (
    <Div
      initial={{ y: "50px" }}
      animate={{ y: 0 }}
      exit={{ y: "50px" }}
      transition={{ ease: "easeInOut" }}
    >
      <Content>
        <Input
          type="text"
          value={locale ? locale : "выберите локацию клкикнув 2 раза по карте"}
          readOnly
        />
        <Button
          onClick={() => handleCloseClick()}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <Img src={closeIcon} />
        </Button>
        <Button
          onClick={() => handleDoneClick()}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <Img src={okIcon} />
        </Button>
      </Content>
    </Div>
  );
};

export default LocationInfo;
