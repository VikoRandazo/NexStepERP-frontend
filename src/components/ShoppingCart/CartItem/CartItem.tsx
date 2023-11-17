import React, { FC } from "react";
import styles from "./CartItem.module.scss";
import { ProductType } from "../../../models/ProductType";
import NumberIncrementor from "../../Elements/NumberIncrementor/NumberIncrementor";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { shoppingCartActions } from "../../../store/slices/shoppingCart";

interface CartItemProps {
  product: ProductType;
  quantity: number;
}


const CartItem: FC<CartItemProps> = ({ product, quantity }) => {
  const { _id, name, price, imageUrl, category, manufacturer, stockQuantity } = product;

  const { dispatch } = useDispatchHook();

  const actionPlus = () => {
    dispatch(shoppingCartActions.setProduct(product));
  };

  const actionMinus = () => {
    if (_id) {
      dispatch(shoppingCartActions.removeProduct(_id));
    }
  };
  return (
    <div className={styles.CartItem}>
      <div className={styles.details}>
        <div className={styles.title}>

        <h5>{name}</h5>
        </div>
        <div className={styles.manufacturer}>

        <span>{manufacturer}</span>
        </div>
      </div>
      <div className={styles.quantityAndPrice}>
        <span className={styles.quantity}>

        <NumberIncrementor
          redux={true}
          min={0}
          max={stockQuantity}
          value={quantity}
          actionPlus={actionPlus}
          actionMinus={actionMinus}
          />
          </span>
          <span className={styles.price}>{price}$</span>
   
      </div>
    </div>
  );
};

export default CartItem;
