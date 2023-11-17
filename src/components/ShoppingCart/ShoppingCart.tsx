import { FC } from "react";
import styles from "./ShoppingCart.module.scss";
import CartItem from "./CartItem/CartItem";
import { ShoppingCartSliceType } from "../../store/slices/shoppingCart";
import { HiShoppingBag } from "react-icons/hi2";
import BtnPrimary from "../Elements/Buttons/Btn-Primary/Btn-Primary";

interface ShoppingCartProps {
  shoppingCart: ShoppingCartSliceType;
}

const ShoppingCart: FC<ShoppingCartProps> = ({ shoppingCart }) => {
  const { products, totalPrice, lastUpdated } = shoppingCart;
  return (
    <div className={styles.ShoppingCart}>
      <div className={styles.items}>
        {products.map((_product) => {
          const { product, quantity } = _product;
          return (
            <span className={styles.item}>
              <CartItem product={product} quantity={quantity} />
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
          <span className={styles.btnCheckout}>
          <BtnPrimary icon={<HiShoppingBag />} text={"Proceed To Checkout"} action={() => {}}/> 
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
