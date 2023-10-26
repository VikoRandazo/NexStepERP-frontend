import { HiArrowDown } from "react-icons/hi2";
import { FilterByEnum, FilterByProps } from "./TypeGuards";
import { IconType } from "react-icons/lib";
import { useState, createElement } from "react";
import { useFormik } from "formik";

export const useDataControlHook = (data: any[]) => {
  const [filterBy, setFilterBy] = useState<FilterByProps>(FilterByEnum.NONE);

  const { handleChange, values } = useFormik({
    initialValues: { min: "", max: "", date: "", search: "" },
    onSubmit: () => {
      console.log(values);
    },
  });
  
  
  return {
    formikBag:{handleChange, values},
    states: { filterBy },
  };
};

