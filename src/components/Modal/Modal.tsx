import React, { FC, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  description: string;
  children: any;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ title, description, children, isOpenModal, setIsOpenModal }) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpenModal(false);
    }
  };

  return (
    <div className={isOpenModal ? `${styles.Modal} ${styles.active}` : styles.Modal}>
      <div onClick={closeModal} className={styles.layout}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h3>{title}</h3>
            <p>{description}</p>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
