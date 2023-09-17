import React, { FC, ReactElement, useState } from "react";
import styles from "./SidebarItem.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appSettingsActions } from "../../../../store/slices/appSettings";

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
  const dispatch= useDispatch()
  
  const handleClick = () => {
    navigate(`/${name}`);
    setActiveNavItem(name);
    dispatch(appSettingsActions.setPageName(name))
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
