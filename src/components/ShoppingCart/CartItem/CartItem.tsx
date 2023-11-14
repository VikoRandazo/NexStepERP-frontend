import React, { FC } from 'react';
import styles from './CartItem.module.scss';

interface CartItemProps {}

const CartItem: FC<CartItemProps> = () => (
  <div className={styles.CartItem}>
    CartItem Component
  </div>
);

export default CartItem;
