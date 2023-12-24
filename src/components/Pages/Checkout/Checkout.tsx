import React, { FC, useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { useCheckout } from "./useCheckout";
import { useDispatchHook } from "../../../hooks/useDispatch";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { HiShoppingBag } from "react-icons/hi2";
import { ButtonCTAEnums } from "../../../models/ButtonsCTAEnums";
import Form from "../../Form/Form";
import { shoppingCartActions } from "../../../store/slices/shoppingCart";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = () => {
  const { states, setters, utiles, formikBag, functions } = useCheckout();
  const { cartApproved } = states;
  const {} = setters;
  const { fields } = utiles;
  const { handleShoppingCart } = functions;

  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);

  return (
    <div className={styles.Checkout}>
      {!cartApproved ? (
        <div className={styles.myCart}>
          <ShoppingCart
            shoppingCart={shoppingCart}
            btnConfig={{
              icon: <HiShoppingBag />,
              actionLabel: ButtonCTAEnums.CHECKOUT,
              action: handleShoppingCart,
            }}
          />
        </div>
      ) : (
        <div className={styles.checkoutForm}>
          <Form fields={fields} formikBag={formikBag} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
