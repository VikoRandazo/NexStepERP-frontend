import React, { FC, useEffect } from "react";
import styles from "./CartItem.module.scss";
import NumberIncrementor from "../../Elements/NumberIncrementor/NumberIncrementor";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { ShoppingCartProduct, shoppingCartActions } from "../../../store/slices/shoppingCart";
interface CartItemProps {
  product:ShoppingCartProduct
}

const CartItem: FC<CartItemProps> = ({ product }) => {
  const { _id, name, price, manufacturer } = product.product;

  const { dispatch } = useDispatchHook();

  const actionPlus = () => {
    dispatch(shoppingCartActions.setProduct(product));
  };

  const actionMinus = () => {
    if (_id) {
      dispatch(shoppingCartActions.removeProduct(_id));
    }
  };


  useEffect(() => {
    console.log(_id);
    
  },[dispatch])

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
        <span className={styles.sumPrice}>{price * product.quantity}$</span>
      </div>
    </div>
  );
};

export default CartItem;
