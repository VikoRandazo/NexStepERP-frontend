import React, { FC, ReactElement, useEffect, useRef } from "react";
import styles from "./Popover.module.scss";
import { PopoverTitleEnum } from "./PopoverTitleEnum";

interface PopoverProps {
  isActivePopover: boolean;
  setIsActivePopover: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement;
  title: PopoverTitleEnum;
}

const Popover: FC<PopoverProps> = ({ children, title, isActivePopover, setIsActivePopover }) => {
  const ref = useRef<HTMLDivElement>(null);
  const closePopover = (e: MouseEvent) => {
    e.stopPropagation();
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsActivePopover(false);
    }
  };

  

  document.addEventListener("mousedown", closePopover);
  useEffect(() => {
    document.removeEventListener("mousedown", closePopover);
  }, [isActivePopover]);
  return (
    <div
      className={isActivePopover ? `${styles.Popover} ${styles.isActive}` : styles.Popover}
      ref={ref}
    >
      <div className={styles.title}>{title}</div>
      <hr />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Popover;
