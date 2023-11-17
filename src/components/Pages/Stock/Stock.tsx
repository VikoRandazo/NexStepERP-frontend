import { FC, useEffect, useState } from "react";
import styles from "./Stock.module.scss";
import { ProductType } from "../../../models/ProductType";
import Modal from "../../Modal/Modal";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { useStockHook } from "./useStockHook";
import ProductItem from "./ProductItem/ProductItem";
import Summary from "../../Summary/Summary";
import { AnalysisObject } from "../../../models/shared/AnalysisObject";
import DataControl from "../../DataControl/DataControl";
import Form from "../../Form/Form";
import { ModalTitleEnum } from "../../../models/ModalTitleEnum";
import { ModalDescriptionEnum } from "../../../models/ModalDescriptionEnum";
import { StoreRootTypes } from "../../../store/store";
import { useSelector } from "react-redux";

interface StockProps {}

const Stock: FC<StockProps> = () => {
  const { data, utiles, states, setters, functions, enums, formikBag } = useStockHook();
  const { products, filteredProducts } = data;
  const { fields, filterOptions } = utiles;
  const { currentCategory, selectedRows, mode, isActiveModal, displayInputUrl } = states;
  const {
    setCurrentCategory,
    setSelectedProductId,
    setFilteredProducts,
    setIsActiveModal,
    setDisplayInputUrl,
  } = setters;
  const { deleteProducts, deleteSingleProduct, getCheckboxEvent } = functions;
  const { dispatch } = useDispatchHook();
  const shoppingCartProducts = useSelector((state:StoreRootTypes) => state.shoppingCart.products)
  // Analitycs
  const [mostPurchasedProduct, setMostPurchasedProduct] = useState<string>("none");
  const [salesPortion, setSalesPortion] = useState<number>(0);

  const findMostPurchasedProduct = () => {
    let mostPurchasedProduct = { name: "none", amount: 0, totalSalesValue: 0 };
    let totalSales = 0;

    // Calculate total sales and find the most purchased product simultaneously
    data.products.reduce((acc, product) => {
      if (product.purchasesAmount) {
        const productTotalSalesValue = product.purchasesAmount * product.price;
        totalSales += productTotalSalesValue;

        if (product.purchasesAmount > acc.amount) {
          acc.amount = +product.purchasesAmount;
          acc.name = product.name;
          acc.totalSalesValue = productTotalSalesValue;
        }
      }

      return acc;
    }, mostPurchasedProduct);

    // Calculate the portion of total sales for the most purchased product
    const salesPortion =
      totalSales > 0 ? (mostPurchasedProduct.totalSalesValue / totalSales) * 100 : 0; // in percentage

    setMostPurchasedProduct(mostPurchasedProduct.name);
    setSalesPortion(+salesPortion.toFixed(2));
  };

  const analysisData: AnalysisObject[] = [
    { title: "Total Products", value: data.products.length },
    { title: "Top Selling Product", value: mostPurchasedProduct },
    { title: "Portion Of Total Income", value: salesPortion + `%` },
  ];

  useEffect(() => {
    findMostPurchasedProduct();
  }, [data.products]);

  return (
    <div className={styles.Stock}>
      <Modal
        children={
          <Form fields={fields} formikBag={formikBag} setIsActiveModal={setIsActiveModal} />
        }
        title={ModalTitleEnum.EDIT_PRODUCT}
        description={ModalDescriptionEnum.EDIT_PRODUCT}
        isActive={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />

      <Summary analysisObject={analysisData} />
      <DataControl
        data={products}
        fields={fields}
        formikbagClient={formikBag}
        filterOptions={filterOptions}
        setFilteredData={setFilteredProducts}
      />

      <div className={styles.displayClients}>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            fields={fields}
            formikBag={formikBag}
            mode={mode}
            setSelectedProductId={setSelectedProductId}
          />
        ))}
      </div>
    </div>
  );
};

export default Stock;
