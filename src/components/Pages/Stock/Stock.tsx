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
import { useDispatchHook } from "../../../hooks/useDispatch";
import { UiActions } from "../../../store/slices/ui";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
interface StockProps {}

const Stock: FC<StockProps> = () => {
  const { states, setters, functions, enums } = useStockHook();

  const {
    interactionsMode,
    filteredProducts,
    currentCategory,
    modalContent,
    clickedProduct,
    selectedRows,
  } = states;

  const {
    setInteractionsMode,
    setFilteredProducts,
    setCurrentCategory,
    setmodalContent,
    setClickedProduct,
  } = setters;

  const { deleteProduct } = functions;
  const { InteractionsModeEnum } = enums;
  const { dispatch } = useDispatchHook();

  const isOpenModal = useSelector((state: StoreRootTypes) => state.ui.modal.isOpen);

  return (
    <div className={styles.Stock}>
      <Modal children={modalContent} />
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
              dispatch(UiActions.setIsOpen(true));
              setmodalContent(
                <ProductForm
                  product={clickedProduct}
                  setInteractionsMode={setInteractionsMode}
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
          // setSelectedRows={setselectedRows}
          // setIsOpenModal={setIsOpenModal}
          // setInteractionsMode={setInteractionsMode}
          cellAction={(clickedItem: any) => {
            setClickedProduct(clickedItem);
            setmodalContent(
              <ProductForm
                // mode={interactionsMode}
                product={clickedItem}
                setInteractionsMode={setInteractionsMode}
                // setIsOpenModal={setIsOpenModal}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default Stock;
