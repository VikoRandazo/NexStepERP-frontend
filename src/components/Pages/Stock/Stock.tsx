import React, { FC, useEffect } from "react";
import styles from "./Stock.module.scss";
import categories from "./categories.json";
import Category from "../../Elements/Category/Category";
import { ProductInitState, ProductType } from "../../../models/ProductType";
import { HiPlus, HiTrash } from "react-icons/hi2";
import Modal from "../../Modal/Modal";
import BtnPrimary from "../../Elements/Buttons/Btn-Primary/Btn-Primary";
import Table from "../../Table/Table";
import BtnOutline from "../../Elements/Buttons/Btn-Outline/Btn-Outline";
import ProductForm from "./ProductForm/ProductForm";
import { BtnActionsTextEnum } from "../../Elements/Buttons/BtnActionsText";

import { useDispatchHook } from "../../../hooks/useDispatch";
import { UiActions } from "../../../store/slices/ui";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { useStockHook } from "./useStockHook";

interface StockProps {}

const Stock: FC<StockProps> = () => {
  const { states, setters, functions, enums } = useStockHook();

  const { filteredProducts, currentCategory, products, clickedProduct, selectedRows } = states;

  const { setCurrentCategory, setClickedProduct } = setters;

  const { deleteProduct } = functions;
  const { InteractionsModeEnum } = enums;
  const { dispatch } = useDispatchHook();

  const isOpenModal = useSelector((state: StoreRootTypes) => state.ui.modal.isOpen);

  const handleClickCreateProductButton = () => {
    dispatch(UiActions.setMode(InteractionsModeEnum.Create));
    dispatch(UiActions.setIsOpen(true));
    // dispatch(UiActions.setModalContent(<ProductForm product={clickedProduct} />));
  };

  return (
    <div className={styles.Stock}>
      <Modal>
        <ProductForm product={ProductInitState}/>
      </Modal>
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
            action={handleClickCreateProductButton}
          />
        </div>
      </div>
      <div className={styles.products}>
        <Table<ProductType>
          data={filteredProducts}
          hasActionsColumn={true}
          selectedRows={selectedRows}
          // modalContent={<ProductForm product={clickedProduct} />}
          cellAction={(clickedProduct: ProductType) => {
            console.log(clickedProduct);
            setClickedProduct(clickedProduct);
            // dispatch(UiActions.setModalContent(<ProductForm product={clickedProduct} />));
          }}
        />
      </div>
    </div>
  );
};

export default Stock;
