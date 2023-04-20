import React, { MouseEvent } from "react";
import { closeModal } from "../redux/features/modalSlice";
import { useAppDispatch } from "../hooks/reduxHook";
import { LayoutModalProps } from "../interfaces/LayoutModal";
import closeIcon from "../icons/closeIcon.svg";
import styled from "styled-components";
import { motion } from "framer-motion";

const Modal = styled(motion.div)`
  position: fixed;
  display: block;

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

const ModalFrame = styled(motion.div)`
  position: relative;
  background: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 5px 10px rgb(0 0 0 / 5%);
  max-width: 720px;
  z-index: 3;
`;

const ContentHead = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled(motion.button)`
  margin: 5px;
  cursor: pointer;
  background-color: inherit;
  border: none;
`;
const ModalContent = styled.div``;

const Img = styled.img`
  width: 30px;
  height: 30px;
`;

const LayoutModal = (props: LayoutModalProps) => {
  const dispatch = useAppDispatch();

  const variants = {
    modal: {},
    locationInfo: {},
  };

  const onModal = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(closeModal());
  };
  //   useEffect(() => {
  //     let top = 10;
  //     if (window.innerWidth > frame.current.clientHeight) {
  //       top = Math.max(
  //         top,
  //         (window.innerHeight - frame.current.clientHeight) / 2 - top
  //       );
  //     }
  //     frame.current.style.marginTop = `${top}px`;
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "auto";
  //     };
  //   });

  return (
    <Modal onClick={(e) => onModal(e)} exit={{ opacity: 0 }}>
      <ModalFrame
        // ref={frame}
        exit={{ opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        animate={{ y: "50%" }}
        variants={variants}
      >
        <ContentHead>
          {/* {props.title} */}
          <CloseButton
            onClick={() => dispatch(closeModal())}
            whileHover={{ rotate: 90 }}
          >
            <Img src={closeIcon} alt="close" />
          </CloseButton>
        </ContentHead>
        <ModalContent>{props.children}</ModalContent>
      </ModalFrame>
    </Modal>
  );
};

export default LayoutModal;
