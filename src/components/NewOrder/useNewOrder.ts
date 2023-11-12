import { useEffect } from "react";
import { useDispatchHook } from "../../hooks/useDispatch";
import { SelectPlaceHolderEnum } from "../../models/SelectPlaceHolderEnum.";
import { InputField } from "../Elements/Input/InputField";
import { UiActions } from "../../store/slices/ui";
import { EntityEnum } from "../../models/EntityEnum";
import { useFormik } from "formik";
import { PurchaseHistoryInit } from "../../models/shared/PurchaseHistory";
import { saleInit } from "../../models/SaleType";
import instance from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";

export const useNewOrder = (cid: string) => {
  const fields: InputField[] = [
    { key: "client.firstName", type: "text", title: "First Name", group: 1, element: "input" },
    { key: "client.lastName", type: "text", title: "Last Name", group: 1, element: "input" },
    { key: "client.lastName", type: "text", title: "Last Name", group: 1, element: "input" },
  ];

  const clients = useSelector((state: StoreRootTypes) => state.entities.clients);

  const getClients = async () => {
    if (clients.length > 0) {
      return;
    }
    try {
      const response = await instance.get(`/clients/all`);
      console.log(response, "called");
    } catch (error) {
      console.log(error);
    }
  };

  const { values } = useFormik({
    initialValues: saleInit,
    onSubmit: async () => {
      try {
        const response = await instance.post(`/sales/cid`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    getClients();
  }, []);

  return { states: { fields } };
};
