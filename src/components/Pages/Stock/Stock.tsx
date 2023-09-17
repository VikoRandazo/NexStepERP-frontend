import React, { FC, useEffect, useState } from "react";
import styles from "./Stock.module.scss";
import categories from "./categories.json";
import Category from "../../Elements/Category/Category";
import instance from "../../../api/axiosInstance";
import { ProductType } from "../../../models/ProductType";
import { HiMagnifyingGlass, HiPlus } from "react-icons/hi2";
import Modal from "../../Modal/Modal";
import BtnPrimary from "../../Elements/Buttons/Btn-Primary/Btn-Primary";
import Table from "../../Table/Table";

interface StockProps {}

const Stock: FC<StockProps> = () => {
  const [titles, setTitles] = useState<string[]>([""]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [tableColumns, setTableColumns] = useState<string[]>([""]);
  const [tableData, setTableData] = useState<ProductType[]>([]);

  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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
  const prepareTableData = () => {
    setTableColumns([
      `name`,
      `price`,
      `category`,
      `stockQuantity`,
      `manufacturer`,
      `purchasesAmount`,
    ]);

    setTableData(() => {
      return filteredProducts.map((product) => {
        const { _id, description, imageUrl, ...restOfProduct } = product;
        return restOfProduct;
      });
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, currentCategory]);

  useEffect(() => {
    prepareTableData();
  }, [filteredProducts]);

  return (
    <div className={styles.Stock}>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} children={""} />
      <div className={styles.categories}>
        <ul className={styles.list}>
          {categories.map((category) => {
            return (
              <Category
                key={category.id}
                category={category}
                active={currentCategory === category.name}
                setCurrentCategory={setCurrentCategory}
              />
            );
          })}
        </ul>
      </div>
      <div className={styles.search}>
        <div className={styles.createProduct}>
          <BtnPrimary
            icon={<HiPlus />}
            text={"Create Product"}
            action={() => setIsOpenModal(true)}
          />
        </div>
      </div>
      <div className={styles.products}>
        <Table data={tableData} columns={tableColumns} />
      </div>
    </div>
  );
};

export default Stock;
