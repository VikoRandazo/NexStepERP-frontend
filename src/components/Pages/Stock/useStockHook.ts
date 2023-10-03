import { useState, useEffect } from "react";
import instance from "../../../api/axiosInstance";
import { ProductType, ProductInitState } from "../../../models/ProductType";
import { InteractionsModeEnum } from "../../../models/shared/InteractionsMode";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { entitiesAction } from "../../../store/slices/entities";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { TableActions } from "../../../store/slices/table";

export const useStockHook = () => {
  const { dispatch } = useDispatchHook();
  const selectedRows = useSelector((state: StoreRootTypes) => state.table.selectedRows);

  // Local States
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  
  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  
  const [clickedProduct, setClickedProduct] = useState(ProductInitState);
  
  const [deletedResponse, setDeletedResponse] = useState<{
    message: string;
    product_deleted: number;
  }>();
  // Redux Selectors
  const products = useSelector((state: StoreRootTypes) => state.entities.stock);
  const modalType = useSelector((state:StoreRootTypes) => state.ui.modal.type)
  const interactionsMode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);

  const getProducts = async () => {
    try {
      const response = await instance.get(`/products/all`);
      console.log(response);
      // setProducts(response.data);
      dispatch(entitiesAction.setStock(response.data));
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

  const deleteProduct = async () => {
    try {
      const response = await instance.post(`/products/delete`, selectedRows);
      dispatch(entitiesAction.removeFromStock(selectedRows));
      console.log(response.data);
      setDeletedResponse(response.data);
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
    if (deletedResponse && deletedResponse.product_deleted > 0) {
      dispatch(TableActions.SelectAll(false));
    }
  }, [deletedResponse]);

  return {
    states: {
      interactionsMode,
      products,
      filteredProducts,
      currentCategory,
      modalType,
      clickedProduct,
      selectedRows,
    },
    setters: {
      setFilteredProducts,
      setCurrentCategory,
      setClickedProduct,
    },
    functions: {
      deleteProduct,
    },
    enums: {
      InteractionsModeEnum,
    },
  };
};
