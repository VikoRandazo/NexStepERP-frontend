import React, { FC, ReactElement, useState } from "react";
import styles from "./SidebarItem.module.scss";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  name: string;
  icon: ReactElement;
  isExpanded: boolean;
  isActive: boolean;
  setActiveNavItem: React.Dispatch<React.SetStateAction<string>>;
}
const SidebarItem: FC<SidebarItemProps> = ({
  name,
  icon,
  isExpanded,
  isActive,
  setActiveNavItem,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${name}`);
    setActiveNavItem(name);
  };

  return (
    <li
      className={
        isExpanded
          ? isActive
            ? `${styles.navItem} ${styles.active} ${styles.isExpanded}`
            : `${styles.navItem} ${styles.isExpanded}`
          : isExpanded
          ? `${styles.navItem} ${styles.active}`
          : `${styles.navItem}`
      }
      onClick={handleClick}
    >
      <span>{icon}</span>
      {isExpanded ? <span>{name}</span> : null}
    </li>
  );
};

export default SidebarItem;
