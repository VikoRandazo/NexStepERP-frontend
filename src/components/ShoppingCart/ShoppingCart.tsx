import React, { FC } from 'react';
import styles from './ShoppingCart.module.scss';
import CartItem from './CartItem/CartItem';
import { ProductSold } from '../../models/ProductSoldType';

interface ShoppingCartProps {
  products: ProductSold | []
}

const ShoppingCart: FC<ShoppingCartProps> = ({products}) => (
  <div className={styles.ShoppingCart}>

    <CartItem />
  </div>
);

export default ShoppingCart;
