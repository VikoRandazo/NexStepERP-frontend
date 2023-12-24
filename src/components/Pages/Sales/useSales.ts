import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { SaleType, saleInit } from "../../../models/SaleType";
import instance from "../../../api/axiosInstance";
import { CustomerType } from "../../../models/CustomerType";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { entitiesAction } from "../../../store/slices/entities";
import { SummaryItemType } from "../../Summary/SummaryItem/SummaryItemType";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";

export const useSales = () => {
  const { dispatch } = useDispatchHook();
  const [clientIds, setClientsIds] = useState<string[]>([]);
  const [clients, setClients] = useState<CustomerType[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const sales = useSelector((state:StoreRootTypes)=> state.entities.sales)

  const handleSetClientsId = () => {
    const clientSet: Set<string> = new Set();
    for (const sale of sales) {
      clientSet.add(sale.customerId);
    }

    setClientsIds([...clientSet]);
  };
  
  const getClients = async () => {
    const response = await instance.post(`clients/multiple`, clientIds);
    setClients(response.data);
  };

  const formikBag = {};

  const onChange_selectRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    console.log(checked);
  };



  const summaries: SummaryItemType[] = [
    {
      keyLabel: "Total Sales",
      value: `$` + sales.reduce((total, sale: SaleType) => (total += sale.totalAmount), 0),
    },
    {
      keyLabel: "Top Client",
      value: "",
    },
  ];
  
  useEffect(() => {
    handleSetClientsId();
    getClients();
  }, [sales]);

  return {
    formik: formikBag,
    data: { sales, clients },
    events: { onChange_selectRow },
    states: { selectedRows },
    setters: { setSelectedRows },
    analyze: { summaries },
  };
};
