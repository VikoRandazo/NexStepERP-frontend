import React, { FC, useEffect, useState } from "react";
import styles from "./DynamicFilter.module.scss";
import { useDynamicFilter } from "./useDynamicFilter";
import { CustomerType } from "../../models/CustomerType";
import { ProductType } from "../../models/ProductType";
import { Sale } from "../../models/Sale";
import { InputField } from "../Elements/Input/InputField";
import { useSelect } from "../Elements/Select/useSelect";
import Form from "../Form/Form";
import { HiRocketLaunch } from "react-icons/hi2";

interface DynamicFilterProps<T> {
  data: T[];
  fields: InputField[];
  filterFunctions: { [key: string]: (data: any[], innerText: string) => any[] };
  initStateFormik: { [key: string]: any };
  getFilteredData?: (FilteredData: T[]) => void;
}

const DynamicFilter = <T extends CustomerType | ProductType | Sale>({
  data,
  fields,
  filterFunctions,
  initStateFormik,
}: DynamicFilterProps<T>): React.ReactElement => {
  const { utiles, functions, states, setters, handlers, formik } =
    useDynamicFilter(initStateFormik);

  const {} = utiles;
  const {} = functions;
  const {} = states;
  const {} = setters;
  const {} = handlers;
  const { handleSubmit, values, handleChange, setFieldValue, resetForm } = formik;

  const footerConfig = {
    btnPrimary: { text: `Filter`, icon: <HiRocketLaunch />, action: () => {} },
    btnSecondary: { text: `Reset`, action: resetForm },
  };

  const handleFilterData = () => {
    const filteredData = data.filter(() => {});
  };

  const [isOpenSelectCategory, setIsOpenSelectCategory] = useState<boolean>(false);
  const { handleOpenSelectMenu } = useSelect(isOpenSelectCategory, setIsOpenSelectCategory);

  //   useEffect(() => {
  // console.log(formik.values);

  //   },[formik.values])
  return (
    <div className={styles.DynamicFilter}>
      <Form fields={fields} formikBag={formik} showFooter={true} footerConfig={footerConfig} />
    </div>
  );
};

export default DynamicFilter;
