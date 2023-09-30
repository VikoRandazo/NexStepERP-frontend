import React, { FC, useEffect } from "react";
import styles from "./Stock.module.scss";
import categories from "./categories.json";
import Category from "../../Elements/Category/Category";
import { ProductType } from "../../../models/ProductType";
import { HiPlus, HiTrash } from "react-icons/hi2";
import Modal from "../../Modal/Modal";
import BtnPrimary from "../../Elements/Buttons/Btn-Primary/Btn-Primary";
import Table from "../../Table/Table";
import BtnOutline from "../../Elements/Buttons/Btn-Outline/Btn-Outline";
import ProductForm from "./ProductForm/ProductForm";
import { BtnActionsTextEnum } from "../../Elements/Buttons/BtnActionsText";
import { useStockHook } from "./useStockHook";

interface StockProps {}

const Stock: FC<StockProps> = () => {
  const { states, setters, functions, enums } = useStockHook();

  const {
    interactionsMode,
    products,
    filteredProducts,
    currentCategory,
    isOpenModal,
    modalContent,
    clickedProduct,
    selectedRows,
  } = states;
  const {
    setInteractionsMode,
    setProducts,
    setFilteredProducts,
    setCurrentCategory,
    setIsOpenModal,
    setmodalContent,
    setClickedProduct,
    setselectedRows,
  } = setters;
  const { deleteProduct } = functions;
  const { InteractionsModeEnum } = enums;

  useEffect(() => {
    console.log(interactionsMode);
  }, [interactionsMode]);
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
            action={deleteProduct}
            disabled={selectedRows.length > 0 ? false : true}
          />
        </div>
        <div className={styles.createProduct}>
          <BtnPrimary
            icon={<HiPlus />}
            text={BtnActionsTextEnum.CREATE}
            action={() => {
              setInteractionsMode(InteractionsModeEnum.Create);
              setIsOpenModal(true);
              setmodalContent(
                <ProductForm
                  mode={InteractionsModeEnum.Create}
                  product={clickedProduct}
                  setInteractionsMode={setInteractionsMode}
                  setIsOpenModal={setIsOpenModal}
                />
              );
            }}
          />
        </div>
      </div>
      <div className={styles.products}>
        <Table<ProductType>
          data={filteredProducts}
          hasActionsColumn={true}
          selectedRows={selectedRows}
          setSelectedRows={setselectedRows}
          setIsOpenModal={setIsOpenModal}
          setInteractionsMode={setInteractionsMode}
          cellAction={(clickedItem: any) => {
            setClickedProduct(clickedItem);
            setmodalContent(
              <ProductForm
                mode={interactionsMode}
                product={clickedItem}
                setInteractionsMode={setInteractionsMode}
                setIsOpenModal={setIsOpenModal}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default Stock;
