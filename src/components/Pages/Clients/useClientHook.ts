import { useFormik } from "formik";
import { CustomerType, initClientState } from "../../../models/CustomerType";
import { InputField } from "../../Elements/Input/InputField";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import { HiArrowDown } from "react-icons/hi2";
import instance from "../../../api/axiosInstance";
import { useEffect, useState } from "react";


const flatMapFunction = (data: any[], prefix = "") => {
  return Object.keys(data).reduce((finalArray: any, objKey: any) => {
    const pre = prefix.length ? prefix + "." : "";
    const currentData = data[objKey];

    if (typeof currentData === "object" && currentData !== null && !Array.isArray(currentData)) {
      Object.assign(finalArray, flatMapFunction(currentData, pre + objKey));
    } else {
      finalArray[pre + objKey] = currentData;
    }

    return finalArray;
  }, {});
};
export const useClientHook = () => {
  const [clients, setClients] = useState<any>([]);

  const getClients = async () => {
    try {
      const response = await instance.get(`clients/all`);
      const data = response.data;
      console.log(data);
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const field: InputField = {
    key: `Search`,
    type: "text",
    title: "Search Client",
    group: 1,
  };

  const filterDate = () => {};
  const filterSpentMoney = () => {};

  const filterOptions = [
    { name: FilterByEnum.NONE, icon: HiArrowDown as React.ElementType, action: () => {} },
    { name: FilterByEnum.DATE, icon: null, action: filterDate },
    { name: FilterByEnum.MOENY_SPENT, icon: null, action: filterSpentMoney },
  ];

  const { values, handleChange, handleBlur } = useFormik({
    initialValues: {
      Search: "",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    getClients();
  }, []);

  let setters;
  let functions;
  let enums;
  return {
    data: { clients },
    dataControl: { filterOptions },
    states: { field },
    setters,
    functions,
    enums,
    formikBag: { values, handleChange, handleBlur },
  };
};
