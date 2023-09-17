import React, { FC } from "react";
import styles from "./Category.module.scss";
import { CategoryType } from "../../../models/CategoryType";

interface CategoryProps {
  category: CategoryType;
  active: boolean;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Category: FC<CategoryProps> = ({ category, active, setCurrentCategory }) => {
  
  const selectCategory = (e: React.MouseEvent<HTMLLIElement>) => {
    setCurrentCategory(e.currentTarget.innerText);
  };

  return (
    <li
      onClick={selectCategory}
      className={active ? `${styles.Category} ${styles.active}` : `${styles.Category}`}
    >
      {category.name}
    </li>
  );
};

export default Category;
