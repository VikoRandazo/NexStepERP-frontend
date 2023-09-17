import React, { FC } from 'react';
import styles from './EditProduct.module.scss';

interface EditProductProps {}

const EditProduct: FC<EditProductProps> = () => (
  <div className={styles.EditProduct}>
    EditProduct Component
  </div>
);

export default EditProduct;
