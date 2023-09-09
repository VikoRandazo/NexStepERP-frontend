import React, { FC, useEffect, useState } from "react";
import styles from "./Stock.module.scss";
import categories from "./categories.json";
import Category from "../../Elements/Category/Category";
import instance from "../../../api/axiosInstance";
import { Product } from "../../../models/ProductType";
import ProductCard from "./ProductCard/ProductCard";
import { HiMagnifyingGlass } from "react-icons/hi2";
interface StockProps {}

const Stock: FC<StockProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  const [searchInput, setSearchInput] = useState<string>("");

  const [isSearchDisplayed, setIsSearchDisplayed] = useState<boolean>(false)
  const getProducts = async () => {
    try {
      const response = await instance.get(`/products/all`);
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = () => {
    setFilteredProducts(() => {
      if (currentCategory === `All`) {
        return products;
      } else {
        return products.filter(({ category }) => {
          return category?.trim().toLowerCase() === currentCategory.trim().toLowerCase();
        });
      }
    });
  };

  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchInput(value);
    setFilteredProducts(() =>
      products.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, currentCategory]);

  return (
    <div className={styles.Stock}>
      <div className={styles.categories}>
        <ul className={styles.list}>
          {categories.map((category) => {
            return <Category category={category} active={currentCategory === category.name} setCurrentCategory={setCurrentCategory} />;
          })}
        </ul>
      </div>
      <div className={styles.search}>
        <span onClick={() => setIsSearchDisplayed(prevstate => !prevstate)}>
          <HiMagnifyingGlass />
        </span>
        <input className={isSearchDisplayed ? styles.active : ""} onChange={searchProduct} type="text" placeholder="Laptop / Chair / Coffee Mug ..." />
      </div>
      <div className={styles.products}>
        {filteredProducts.map((product: Product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default Stock;
