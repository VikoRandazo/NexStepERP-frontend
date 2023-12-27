import { useEffect } from "react";
import instance from "../../../api/axiosInstance";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { entitiesAction } from "../../../store/slices/entities";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { AnalysisObject } from "../../../models/shared/AnalysisObject";
import { SaleType } from "../../../models/SaleType";
import { CustomerType } from "../../../models/CustomerType";
import { PurchaseHistoryType } from "../../../models/shared/PurchaseHistory";

export const useOverView = () => {
  const { dispatch } = useDispatchHook();

  const products = useSelector((state: StoreRootTypes) => state.entities.stock.actions.setStock);
  const clients = useSelector((state: StoreRootTypes) => state.entities.clients.actions.setClients);
  const sales = useSelector((state: StoreRootTypes) => state.entities.sales);

  const getProducts = async () => {
    try {
      const response = await instance.get(`products/all`);
      dispatch(entitiesAction.setStock(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getClients = async () => {
    try {
      const response = await instance.get(`clients/all`);
      dispatch(entitiesAction.setClients(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getSales = async () => {
    try {
      const response = await instance.get(`sales/all`);
      dispatch(entitiesAction.setSales(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalSales = sales.reduce((total, sale: SaleType) => (total += sale.totalAmount), 0);

  const totalSales: AnalysisObject = { title: `Total Sales`, value: getTotalSales + `$` };

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
    if (clients.length === 0) {
      getClients();
    }
    if (sales.length === 0) {
      getSales();
    }
  }, []);
  return { analysis: { totalSales } };
};
