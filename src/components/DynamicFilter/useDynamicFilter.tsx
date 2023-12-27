import { useFormik } from "formik";
import { useEffect, useState } from "react";

export const useDynamicFilter = (name: string, data: any[]) => {
  const [hideProps, setHideProps] = useState<string[]>([]); // when ui is built, user will choose which to hide

  const [rangeValue, setRangeValue] = useState<{ [name: string]: { min: number; max: number } }>({
    [name]: {
      min: 0,
      max: 0,
    },
  });

  const { handleSubmit, values, handleChange, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });

  const handleGetFilterProperties = () => {
    if (data) {
      const properties = Object.keys(data[0]).map((prop: string) => prop);
      const hideStrictProps = ["_id", "id", "imageUrl", "description", "name"];
      const formattedArray = properties.filter((prop) => !hideStrictProps.includes(prop));
      console.log(formattedArray); // build filters fields for those in the array
    }
  };

  useEffect(() => {
    // handleGetFilterProperties();
  }, []);

  return { states: { rangeValue }, setters: { setRangeValue }, utiles: {} };
};
