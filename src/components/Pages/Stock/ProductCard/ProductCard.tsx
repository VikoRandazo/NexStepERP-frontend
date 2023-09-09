import React, { FC } from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "../../../../models/ProductType";
import {
  HiEllipsisVertical,
  HiExclamationCircle,
  HiCheckCircle,
  HiMinusCircle,
} from "react-icons/hi2";
interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const inStock = {
    inStock: product.stockQuantity && product.stockQuantity > 5,
    stockLow: product.stockQuantity && product.stockQuantity <= 5 && product.stockQuantity > 0,
    outOfStock: product.stockQuantity === 0,
  };

  return (
    <div className={styles.ProductCard}>
      <div className={styles.img}>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.manufacturer}>{product.manufacturer}</p>
        <div className={styles.stock}>
          <div className={styles.inStock}>
            {inStock.outOfStock ? (
              <span className={styles.outOfStock}>
                <HiMinusCircle />
              </span>
            ) : inStock.stockLow ? (
              <span className={styles.stockAlert}>
                <HiExclamationCircle />
              </span>
            ) : (
              <span className={styles.success}>
                <HiCheckCircle />
              </span>
            )}
          </div>
          <p>Stock: {product.stockQuantity}</p>
        </div>
      </div>
      <div className={styles.options}>
        <HiEllipsisVertical />
      </div>
    </div>
  );
};

export default ProductCard;
