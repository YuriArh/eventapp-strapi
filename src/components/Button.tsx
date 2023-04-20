import styled from "styled-components";
import { openModal } from "../redux/features/modalSlice";
import plusIcon2 from "../icons/icons8-plus.svg";
import { useAppDispatch } from "../hooks/reduxHook";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  border-radius: 50%;
  width: 60px;
  height: 60px;

  background: linear-gradient(to right, #fd746c, #ff9068);
  font-size: 24px;
  position: fixed;
  z-index: 1;
  right: 48.5%;
  bottom: 0;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 35px;
`;

const Button = () => {
  const dispatch = useAppDispatch();
  return (
    <StyledButton
      onClick={() => dispatch(openModal())}
      whileHover={{ scale: [null, 1.5, 1.4] }}
      transition={{ duration: 0.3 }}
      animate={{ y: "-30%" }}
      exit={{ y: "100%" }}
    >
      <Img src={plusIcon2} alt="plus icon" />
    </StyledButton>
  );
};

export default Button;
