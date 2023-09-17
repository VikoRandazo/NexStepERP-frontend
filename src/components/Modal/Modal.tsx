import React, { FC } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: any;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({  children, isOpenModal, setIsOpenModal }) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpenModal(false);
    }
  };

  return (
    <div className={isOpenModal ? `${styles.Modal} ${styles.active}` : styles.Modal}>
      <div onClick={closeModal} className={styles.layout}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
