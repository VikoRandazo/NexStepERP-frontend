import React, { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { HiChatBubbleOvalLeftEllipsis, HiMiniBell, HiShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import Popover from "../../Elements/Popover/Popover";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { PopoverTitleEnum } from "../../Elements/Popover/PopoverTitleEnum";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isActivePopoverShoppingCart, setIsActivePopoverShoppingCart] = useState<boolean>(false);

  const currentPage = useSelector((state: StoreRootTypes) => state.appSettings.pageName);
  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);

  const handleOpenShoppingCartPopover = () => {
    setIsActivePopoverShoppingCart(true);
  };

  


  return (
    <div className={styles.Header}>
      <div className={styles.title}>
        <h2>{currentPage}</h2>
      </div>
      <div className={styles.user}>
        <div className={styles.system}>
          <div className={styles.shoppingCart} onClick={handleOpenShoppingCartPopover}>
            <HiShoppingCart />
            <Popover
            isActivePopover={isActivePopoverShoppingCart}
              setIsActivePopover={setIsActivePopoverShoppingCart}
              children={<ShoppingCart shoppingCart={shoppingCart} />}
              title={PopoverTitleEnum.SHOPPING_CART}
            />
          </div>
          <div className={styles.notifications}>
            <HiMiniBell />
          </div>
          <div className={styles.messages}>
            <HiChatBubbleOvalLeftEllipsis />
          </div>
        </div>
        {/* <div className={styles.userImg}>
          <img src="https://did.li/akHCN" />
        </div> */}
        <div className={styles.userDetails}>
          <h5>user name</h5>
          <span>demo@example.com</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
