import styled from "styled-components";
import { circInOut, motion } from "framer-motion";
import loading from "../icons/loading.svg";

const LoaderWrapper = styled.div`
  position: fixed;
  display: flex;

  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  min-height: 100%;
  box-sizing: border-box;
  transition: background-color 2s;
`;
const LoaderInner = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 25%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const LoaderImage = styled(motion.img)`
  width: 100px;
  margin: auto;
`;

const Loader = () => {
  const spinTransition = {
    repeat: Infinity,
    duration: 2,
    easy: circInOut,
  };

  return (
    <LoaderWrapper>
      <LoaderInner>
        <LoaderImage
          src={loading}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </LoaderInner>
    </LoaderWrapper>
  );
};

export default Loader;
