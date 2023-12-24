import React, { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import {
  HiChatBubbleOvalLeftEllipsis,
  HiMiniBell,
  HiPower,
  HiShoppingBag,
  HiShoppingCart,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import Popover from "../../Elements/Popover/Popover";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { PopoverTitleEnum } from "../../Elements/Popover/PopoverTitleEnum";
import { useNavigate } from "react-router-dom";
import { ButtonCTAEnums } from "../../../models/ButtonsCTAEnums";
import BtnSecondary from "../../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { useAuth } from "../../Auth/useAuth";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isActivePopoverShoppingCart, setIsActivePopoverShoppingCart] = useState<boolean>(false);

  const currentPage = useSelector((state: StoreRootTypes) => state.appSettings.pageName);
  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);

  const handleOpenShoppingCartPopover = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsActivePopoverShoppingCart((prev) => !prev);
  };

  const navigate = useNavigate();

  const navigateCheckout = () => {
    navigate(`/checkout`);
  };

  const {register} = useAuth()
  const {handlers} = register
const {handleLogout} = handlers
  const user = useSelector((state: StoreRootTypes) => state.userAuth);

  const { firstName, lastName, email, user_verified } = user;
  return user_verified ? (
    <div className={styles.Header}>
      <div className={styles.title}>
        <h2>{currentPage}</h2>
      </div>
      <div className={styles.user}>
        <div className={styles.system}>
          <div className={styles.shoppingCart} onClick={handleOpenShoppingCartPopover}>
            <HiShoppingCart />
            <div
              className={`${styles.popOverContainer} ${
                isActivePopoverShoppingCart ? styles.active : ""
              }`}
            >
              <Popover
                isActivePopover={isActivePopoverShoppingCart}
                setIsActivePopover={setIsActivePopoverShoppingCart}
                children={
                  <ShoppingCart
                    shoppingCart={shoppingCart}
                    btnConfig={{
                      icon: <HiShoppingBag />,
                      actionLabel: ButtonCTAEnums.CHECKOUT,
                      action: navigateCheckout,
                    }}
                  />
                }
                title={PopoverTitleEnum.SHOPPING_CART}
              />
            </div>
          </div>
          <div className={styles.notifications}>
            <HiMiniBell />
          </div>
          <div className={styles.messages}>
            <HiChatBubbleOvalLeftEllipsis />
          </div>
        </div>

        <div className={styles.userDetails}>
          <h5>{`${firstName} ${lastName}`}</h5>
          <span>{`${email}`}</span>
        </div>
      </div>
      <hr />
      <div className={styles.logout}>
        <BtnSecondary text={`Logout`} icon={<HiPower />} action={handleLogout} />
      </div>
    </div>
  ) : null;
};

export default Header;
