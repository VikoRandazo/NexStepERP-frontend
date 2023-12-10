import { FC, useEffect, useState } from "react";
import styles from "./Stock.module.scss";
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
  const { data, utiles, states, setters, functions, handlers, enums, formikBag } = useStockHook();
  const { products, filteredProducts } = data;
  const { fields } = utiles;
  const { currentCategory, mode, isActiveModal, displayInputUrl } = states;
  const {
    setCurrentCategory,
    setSelectedProductId,
    setFilteredProducts,
    setIsActiveModal,
    setDisplayInputUrl,
    setFieldValue,
  } = setters;
  const { deleteSingleProduct, getCheckboxEvent } = functions;
  const { handleSelectCategory } = handlers;
  const { dispatch } = useDispatchHook();

  // Analitycs
  const [mostPurchasedProduct, setMostPurchasedProduct] = useState<string>("none");
  const [salesPortion, setSalesPortion] = useState<number>(0);
  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);
  const findMostPurchasedProduct = () => {
    let mostPurchasedProduct = { name: "none", amount: 0, totalSalesValue: 0 };
    let totalSales = 0;

    products.reduce((acc, product) => {
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

    const salesPortion =
      totalSales > 0 ? (mostPurchasedProduct.totalSalesValue / totalSales) * 100 : 0;

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
  }, [products]);

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
      <DataControl data={products} fields={fields} formikbagClient={formikBag} />

      <div className={styles.displayClients}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            shoppingCart={shoppingCart}
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
