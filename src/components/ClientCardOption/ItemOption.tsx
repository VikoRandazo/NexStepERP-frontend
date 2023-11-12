import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./ItemOption.module.scss";
import { HiChevronRight } from "react-icons/hi2";

interface ItemOptionProps {
  icon: JSX.Element;
  text: string;
  action: () => void;
}

const ItemOption: FC<ItemOptionProps> = ({ icon, text, action }) => {
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
      className={styles.ItemOption} >
      <span>
        {icon} {text}
      </span>
      <HiChevronRight />
    </span>
  );
};

export default ItemOption;
