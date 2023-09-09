import React, { FC, useState } from "react";
import styles from "./SideBar.module.scss";
import { ReactComponent as Horizontal } from "../../../styles/Logo/horizontal.svg";
import { ReactComponent as Svg } from "../../../styles/Logo/favicon.svg";
import {
  HiArrowRightCircle,
  HiArrowLeftCircle,
  HiSquaresPlus,
  HiChatBubbleLeftEllipsis,
  HiUser,
  HiSquare3Stack3D,
  HiCog6Tooth,
  HiPower,
} from "react-icons/hi2";
import BtnTransparent from "../../Elements/Buttons/Btn-Transparent/Btn-Transparent";
import { useDispatch } from "react-redux";
import { sideBarActions } from "../../../store/slices/sideBar";
import { NavItem } from "../../../models/Nav";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem/SidebarItem";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpended, setIsExpended] = useState<boolean>(true);
  const [activeNavItem, setActiveNavItem] = useState<string>(`Overview`);

  const handleExpandSideBar = () => {
    setIsExpended(!isExpended);
    dispatch(sideBarActions.toggleSideBar());
  };

  const navigation: NavItem[] = [
    { name: `Overview`, icon: <HiSquaresPlus /> },
    { name: `Stock`, icon: <HiSquare3Stack3D /> },
    { name: `Clients`, icon: <HiUser /> },
    { name: `Sales`, icon: <HiSquaresPlus /> },
    { name: `Messages`, icon: <HiChatBubbleLeftEllipsis /> },
    { name: `Settings`, icon: <HiCog6Tooth /> },
    { name: `Logout`, icon: <HiPower /> },
  ];

  return (
    <div className={isExpended ? styles.SideBar : `${styles.SideBar} ${styles.collapsed}`}>
      <div className={styles.header}>
        <div className={styles.logo}>{isExpended ? <Horizontal /> : <Svg />}</div>
      </div>
      <nav className={styles.main}>
        <ul className={styles.navItems}>
          {navigation.map((item: NavItem) => {
            return (
              <SidebarItem
                name={item.name}
                icon={item.icon}
                isExpanded={isExpended}
                isActive={activeNavItem === item.name}
                setActiveNavItem={setActiveNavItem}
              />
            );
          })}
        </ul>
      </nav>
      <div className={styles.footer}>
        <BtnTransparent action={handleExpandSideBar}>
          {isExpended ? <HiArrowLeftCircle /> : <HiArrowRightCircle />}
        </BtnTransparent>
      </div>
    </div>
  );
};

export default SideBar;
