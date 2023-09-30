import React, { FC } from 'react';
import styles from './ReadOnlyProductForm.module.scss';
import { ProductType } from '../../../../../models/ProductType';

interface ReadOnlyProductFormProps {
  product: ProductType
}

const ReadOnlyProductForm: FC<ReadOnlyProductFormProps> = () => (
  <div className={styles.ReadOnlyProductForm}>
    ReadOnlyProductForm Component
  </div>
);

export default ReadOnlyProductForm;
