import React, { FC, useCallback, useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem/SidebarItem";
import { appSettingsActions } from "../../../store/slices/appSettings";
import { UiActions } from "../../../store/slices/ui";
import { EntityEnum } from "../../../models/EntityEnum";
import { PagesNames } from "../../../models/pagesName";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const [isExpended, setIsExpended] = useState<boolean>(true);
  const [activeNavItem, setActiveNavItem] = useState<string>(`Overview`);

  const handleExpandSideBar = () => {
    setIsExpended(!isExpended);
    dispatch(sideBarActions.toggleSideBar());
  };

  const handleChangeEntity = useCallback(() => {
    switch (location.toLowerCase()) {
      case "/products":
        dispatch(UiActions.setEntity(EntityEnum.STOCK));
        break;
      case "/clients":
        dispatch(UiActions.setEntity(EntityEnum.Clients));
        break;
      default:
        break;
    }
  }, [dispatch, location]);

  const navigation: NavItem[] = [
    { name: PagesNames.Overview, icon: <HiSquaresPlus /> },
    { name: PagesNames.Stock, icon: <HiSquare3Stack3D /> },
    { name: PagesNames.Clients, icon: <HiUser /> },
    { name: PagesNames.Sales, icon: <HiSquaresPlus /> },
    { name: PagesNames.Messages, icon: <HiChatBubbleLeftEllipsis /> },
    { name: PagesNames.Settings, icon: <HiCog6Tooth /> },
  ];

const user  = useSelector((state:StoreRootTypes) => state.userAuth)
  const {user_verified} = user

  useEffect(() => {
    handleChangeEntity();
  }, [location]);

  return (
    user_verified ? (
      <div className={isExpended ? styles.SideBar : `${styles.SideBar} ${styles.collapsed}`}>
        <div className={styles.header}>
          <div className={styles.logo}>{isExpended ? <Horizontal /> : <Svg />}</div>
        </div>
        <nav className={styles.main}>
          <ul className={styles.navItems}>
            {navigation.map((item: NavItem, index) => (
              <SidebarItem
                key={index}
                name={item.name}
                icon={item.icon}
                isExpanded={isExpended}
                isActive={activeNavItem === item.name}
                setActiveNavItem={setActiveNavItem}
              />
            ))}
          </ul>
        </nav>
        <div className={styles.footer}>
          <BtnTransparent
            icon={isExpended ? <HiArrowLeftCircle /> : <HiArrowRightCircle />}
            action={handleExpandSideBar}
          />
        </div>
      </div>
    ) : null
  );
  };

export default SideBar;
