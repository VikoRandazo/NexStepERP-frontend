import React, { FC, useEffect, useState } from "react";
import styles from "./CartItem.module.scss";
import NumberIncrementor from "../../Elements/NumberIncrementor/NumberIncrementor";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { ShoppingCartProduct, shoppingCartActions } from "../../../store/slices/shoppingCart";
interface CartItemProps {
  product: ShoppingCartProduct;
}

const CartItem: FC<CartItemProps> = ({ product }) => {
  const { id, name, price, manufacturer } = product.product;
  const [formattedPrice, setFormattedPrice] = useState<string>('0.00');
  const { dispatch } = useDispatchHook();

  const actionPlus = () => {
    dispatch(shoppingCartActions.setProduct(product));
  };

  const actionMinus = () => {
    if (id) {
      dispatch(shoppingCartActions.removeProduct(id));
    }
  };

  useEffect(() => {
    const totalPrice = price * product.quantity;
    setFormattedPrice(totalPrice.toFixed(2));
  }, [price, product.quantity]);

  return (
    <div className={styles.CartItem}>
      <div className={styles.details}>
        <div className={styles.title}>{<h5>{name}</h5>}</div>
        <div className={styles.manufacturer}>{<span>{manufacturer}</span>}</div>
      </div>
      <div className={styles.quantityAndPrice}>
        <span className={styles.quantity}>
          <NumberIncrementor
            redux={true}
            min={0}
            max={0}
            value={product.quantity}
            actionPlus={actionPlus}
            actionMinus={actionMinus}
          />
        </span>
        <span className={styles.sumPrice}>{formattedPrice}$</span>
      </div>
    </div>
  );
};

export default CartItem;
