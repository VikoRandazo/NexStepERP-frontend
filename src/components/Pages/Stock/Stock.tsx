import React, { FC, useEffect, useState } from "react";
import styles from "./Stock.module.scss";
import categories from "./categories.json";
import Category from "../../Elements/Category/Category";
import instance from "../../../api/axiosInstance";
import { ProductInitState, ProductType } from "../../../models/ProductType";
import { HiPlus, HiTrash } from "react-icons/hi2";
import Modal from "../../Modal/Modal";
import BtnPrimary from "../../Elements/Buttons/Btn-Primary/Btn-Primary";
import Table from "../../Table/Table";
import BtnOutline from "../../Elements/Buttons/Btn-Outline/Btn-Outline";
import CreateProduct from "./CreateProduct/ProductForm";
import ProductForm from "./CreateProduct/ProductForm";

interface StockProps {}

const Stock: FC<StockProps> = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [modalContent, setmodalContent] = useState<JSX.Element | null>(null);
  const [clickedProduct, setClickedProduct] = useState(ProductInitState);
  const [selectedRows, setselectedRows] = useState<ProductType[]>([]);

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

  const deleteFunction = async () => {
    try {
      const response = await instance.post(`/products/delete`, selectedRows);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, currentCategory]);


  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <div className={styles.Stock}>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} children={modalContent} />
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
        <div className={styles.actions}>
          <BtnOutline
            icon={<HiTrash />}
            text={`Delete ${selectedRows.length > 0 ? `(${selectedRows.length})` : ""}`}
            action={deleteFunction}
            disabled={selectedRows.length > 0 ? false : true}
          />
        </div>
        <div className={styles.createProduct}>
          <BtnPrimary
            icon={<HiPlus />}
            text={"Create Product"}
            action={() => {
              setmodalContent(<ProductForm mode="create" product={clickedProduct} />);
              setIsOpenModal(true);
            }}
          />
        </div>
      </div>
      <div className={styles.products}>
        <Table<ProductType>
          data={products}
          cellAction={(clickedItem: any) => {
            setClickedProduct(clickedItem);
            setmodalContent(<ProductForm mode="edit" product={clickedItem} />);
            setIsOpenModal(true);
          } }
          selectedRows={selectedRows}
          setSelectedRows={setselectedRows}         />
      </div>
    </div>
  );
};

export default Stock;
