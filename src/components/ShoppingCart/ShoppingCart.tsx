import { FC, useEffect, useState } from "react";
import styles from "./ShoppingCart.module.scss";
import CartItem from "./CartItem/CartItem";
import {
  ShoppingCartProduct,
  ShoppingCartSliceType,
  shoppingCartActions,
} from "../../store/slices/shoppingCart";
import { HiShoppingBag } from "react-icons/hi2";
import BtnPrimary from "../Elements/Buttons/Btn-Primary/Btn-Primary";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";
import { useDispatchHook } from "../../hooks/useDispatch";
import BtnSecondary from "../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { useNavigate } from "react-router-dom";

interface ShoppingCartProps {
  shoppingCart: ShoppingCartSliceType;
}

const ShoppingCart: FC<ShoppingCartProps> = ({ shoppingCart }) => {
  const { dispatch } = useDispatchHook();
  const navigate = useNavigate();

  const [value, setValue] = useState<string>("");
  const { totalPrice, lastUpdated } = shoppingCart;
  const cartProducts = useSelector((state: StoreRootTypes) => state.shoppingCart.products);

  const clearCart = () => {
    dispatch(shoppingCartActions.clearCart());
  };

  const handleMoveToCheckout = () => {
    if (cartProducts.length > 0) {
      navigate(`checkout`);
    }
  };

  return (
    <div className={styles.ShoppingCart}>
      <div className={styles.items}>
        {cartProducts.map((product: ShoppingCartProduct, i) => {
          return (
            <span className={styles.item}>
              <CartItem key={i} product={product} />
              <hr />
            </span>
          );
        })}
      </div>

      <div className={styles.footer}>
        <div className={styles.subtotalPriceContainer}>
          <span className={styles.title}>Subtotal:</span>
          <span className={styles.subtotalPrice}>{totalPrice}$</span>
        </div>
        <hr />
        <div className={styles.discountContainer}>
          <span className={styles.title}>Discount:</span>
          <span className={styles.discount}>25%</span>
        </div>
        <hr />

        <div className={styles.totalPriceContainer}>
          <span className={styles.title}>Total:</span>
          <span className={styles.totalPrice}>{totalPrice * (1 - 0.25)}$</span>
        </div>

        <div className={styles.checkout}>
          <span className={styles.btnClearCart}>
            <BtnSecondary text={"Clear Cart"} action={clearCart} />
          </span>
          <span className={styles.btnCheckout}>
            <BtnPrimary
              icon={<HiShoppingBag />}
              text={"Proceed To Checkout"}
              action={handleMoveToCheckout}
            />
          </span>
        </div>
        <span className={styles.lastUpdated}>Last updated: {lastUpdated}</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
