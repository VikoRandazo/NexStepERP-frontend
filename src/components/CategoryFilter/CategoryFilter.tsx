import React, { FC } from 'react';
import styles from './CategoryFilter.module.scss';

interface CategoryFilterProps {}

const CategoryFilter: FC<CategoryFilterProps> = () => (
  <div className={styles.CategoryFilter}>
    CategoryFilter Component
  </div>
);

export default CategoryFilter;
