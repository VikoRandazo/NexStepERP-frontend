import { useState, useEffect } from "react";
import instance from "../../../api/axiosInstance";
import { ProductType, ProductInitState } from "../../../models/ProductType";
import { InteractionsMode, InteractionsModeEnum } from "../../../models/shared/InteractionsMode";
export const useStockHook = () => {
  const [interactionsMode, setInteractionsMode] = useState<InteractionsMode>(
    InteractionsModeEnum.Create
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [modalContent, setmodalContent] = useState<JSX.Element | null>(null);
  const [clickedProduct, setClickedProduct] = useState(ProductInitState);
  const [selectedRows, setselectedRows] = useState<{ _id: string }[]>([]);

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

  const deleteProduct = async () => {
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

  return {
    states: {
      interactionsMode,
      products,
      filteredProducts,
      currentCategory,
      isOpenModal,
      modalContent,
      clickedProduct,
      selectedRows,
    },
    setters: {
      setInteractionsMode,
      setProducts,
      setFilteredProducts,
      setCurrentCategory,
      setIsOpenModal,
      setmodalContent,
      setClickedProduct,
      setselectedRows,
    },
    functions: {
      deleteProduct,
    },
    enums: {
      InteractionsModeEnum
    }
  };
};
