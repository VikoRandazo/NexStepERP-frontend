import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./ClientCardOption.module.scss";
import { HiChevronRight } from "react-icons/hi2";

interface ClientCardOptionProps {
  icon: JSX.Element;
  text: string;
  action: () => void;
}

const ClientCardOption: FC<ClientCardOptionProps> = ({ icon, text, action }) => {
  const optionRef = useRef<HTMLSpanElement>(null);
  
  const handleClick = (e:React.MouseEvent<HTMLSpanElement>) => {

    action();
  };



  useEffect(() => {

  })
  return (
    <span
      ref={optionRef}
      onClick={handleClick}
      className={styles.ClientCardOption}
    >
      <span>
        {icon} {text}
      </span>
      <HiChevronRight />
    </span>
  );
};

export default ClientCardOption;
