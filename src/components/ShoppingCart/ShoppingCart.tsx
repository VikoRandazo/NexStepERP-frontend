import { FC, ReactElement, useEffect, useState } from "react";
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
import { useFormatDate } from "../../hooks/useFormatDate";

interface ShoppingCartProps {
  shoppingCart: ShoppingCartSliceType;
  btnConfig: {
    icon: ReactElement;
    actionLabel: string;
    action: () => void;
  };
}

const ShoppingCart: FC<ShoppingCartProps> = ({ shoppingCart, btnConfig }) => {
  const { dispatch } = useDispatchHook();
  const { icon, actionLabel, action } = btnConfig;
  const { totalPrice, lastUpdated } = shoppingCart;
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>(0);
  const cartProducts = useSelector((state: StoreRootTypes) => state.shoppingCart.products);
  const clearCart = () => {
    dispatch(shoppingCartActions.clearCart());
  };

  useEffect(() => {
    setTotalAfterDiscount(totalPrice * (1 - discountRate));
    totalAfterDiscount.toFixed(2)
  }, [totalPrice, discountRate]);

  useEffect(()=> {
console.log(totalAfterDiscount);

  },[totalAfterDiscount])

  return (
    <div className={styles.ShoppingCart}>
      <div className={styles.items}>
        {cartProducts.length > 0 ? (
          cartProducts.map((product: ShoppingCartProduct, i) => {
            return (
              <span className={styles.item}>
                <CartItem key={i} product={product} />
                <hr />
              </span>
            );
          })
        ) : (
          <div className={styles.noProducts}>
            <span>Your cart is empty...</span>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.subtotalPriceContainer}>
          <span className={styles.title}>Subtotal:</span>
          <span className={styles.subtotalPrice}>{totalPrice}$</span>
        </div>
        <hr />
        <div className={styles.discountContainer}>
          <span className={styles.title}>Discount:</span>
          <span className={styles.discount}>{discountRate}%</span>
        </div>
        <hr />

        <div className={styles.totalPriceContainer}>
          <span className={styles.title}>Total:</span>
          <span className={styles.totalPrice}>{totalAfterDiscount}$</span>
        </div>

        <div className={styles.checkout}>
          <span className={styles.btnClearCart}>
            <BtnSecondary text={"Clear Cart"} action={clearCart} />
          </span>
          <span className={styles.btnCheckout}>
            <BtnPrimary icon={icon} text={actionLabel} action={action} />
          </span>
        </div>
        <span className={styles.lastUpdated}>Last updated: {lastUpdated}</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
