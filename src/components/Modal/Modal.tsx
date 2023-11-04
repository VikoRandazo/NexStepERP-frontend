import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";

interface ModalProps {
  children: JSX.Element | null;
  isActive: boolean
  setIsActiveModal:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: FC<ModalProps> = ({ children, isActive, setIsActiveModal }) => {
  const { dispatch } = useDispatchHook();


  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsActiveModal(false)
    }
  };


  return (
    <div className={isActive ? `${styles.Modal} ${styles.active}` : styles.Modal}>
      <div onClick={closeModal} className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
