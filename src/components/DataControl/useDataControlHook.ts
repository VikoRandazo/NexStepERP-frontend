import { FilterByEnum, FilterByProps } from "./TypeGuards";
import { useState, useEffect } from "react";
import { useFormik } from "formik";

export const useDataControlHook = <T extends object>(
  data: T[],
  setFilteredClients: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const [filterBy, setFilterBy] = useState<FilterByProps>(FilterByEnum.NONE);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  const { handleChange, values, setFieldValue } = useFormik({
    initialValues: { min: "", max: "", date: "", search: "" },
    onSubmit: () => {
      console.log(values);
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setFieldValue(name, value);


  };

  // Flatmap the object along with generics and filter the keys for the search filter
  // also, create a function to filter information along with the generics mapped keys

  return {
    data: { handleSearch },
    formikBag: { handleChange, values },
    states: { filterBy, isActiveModal },
    setters: {setIsActiveModal}
  };
};
