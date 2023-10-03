import React, { FC } from 'react';
import styles from './EditProductForm.module.scss';
import { ProductType } from '../../../../../../models/ProductType';

interface EditProductFormProps {
  product: ProductType
formikBag: any
formControls: any
}

const EditProductForm: FC<EditProductFormProps> = () => (
  <div className={styles.EditProductForm}>
    EditProductForm Component
  </div>
);

export default EditProductForm;
