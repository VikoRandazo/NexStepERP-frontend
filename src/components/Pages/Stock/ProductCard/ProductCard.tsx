import React, { FC, useState } from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "../../../../models/ProductType";
import {
  HiEllipsisVertical,
  HiExclamationCircle,
  HiCheckCircle,
  HiMinusCircle,
} from "react-icons/hi2";
import Select from "../../../Elements/Select/Select";
import { OptionType } from "../../../../models/Elements/Option";
import instance from "../../../../api/axiosInstance";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isOpenSelectMenu, setIsOpenSelectMenu] = useState<boolean>(false);

  const inStock = {
    inStock: product.stockQuantity && product.stockQuantity > 5,
    stockLow: product.stockQuantity && product.stockQuantity <= 5 && product.stockQuantity > 0,
    outOfStock: product.stockQuantity === 0,
  };

  const OptionActionOpen = async () => {
    
  }
  const OptionActionEdit = async () => {

  }
  const OptionActionDelete = async () => {
    try {
      
      const response = await instance.delete(`/products/${product._id}`)
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }



  const options: OptionType[] = [
    { name: `Open`, action: OptionActionOpen },
    { name: `Edit`, action: OptionActionEdit },
    { name: `Delete`, action: OptionActionDelete },
  ];



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
        <Select isActive={isOpenSelectMenu} options={options} />
        <span onClick={() => setIsOpenSelectMenu((prevstate) => !prevstate)}>
          <HiEllipsisVertical />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
