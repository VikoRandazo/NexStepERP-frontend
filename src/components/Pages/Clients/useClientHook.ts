import { useFormik } from "formik";
import { initClientState } from "../../../models/CustomerType";
import { InputField } from "../../Elements/Input/InputField";
import instance from "../../../api/axiosInstance";
import { useEffect, useMemo, useState } from "react";
import { UiActions } from "../../../store/slices/ui";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { InteractionsModeEnum } from "../../../models/shared/InteractionsMode";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
import { entitiesAction } from "../../../store/slices/entities";
import countries from "./countries.json";

export const useClientHook = () => {
  console.log("rendered");

  const { dispatch } = useDispatchHook();
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const clients = useSelector((state: StoreRootTypes) => state.entities.clients.actions.setClients);

  const preparedInitState = { ...initClientState };
  const { dateRegistered, purchaseHistory, ...rest } = preparedInitState;

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: rest,
    validationSchema: "",
    onSubmit: async () => {
      try {
        let response;
        switch (mode) {
          case InteractionsModeEnum.Create:
            response = await instance.post(`/clients/new`, values);
            console.log(response.data);
            break;

          case InteractionsModeEnum.Edit:
            console.log("Edit");
            response = await instance.patch(`/clients/${selectedClientId}`, values);
            console.log(response.data);
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(errors);
      } finally {
        console.log(errors);

        dispatch(UiActions.setIsOpen(false));
      }
    },
  });

  const handleSetCountry = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    console.log(innerText);
    setFieldValue(`address.country`, innerText);
  };
  const MemoizedCountries = useMemo(() => countries, []);

  const fields: InputField[] = [
    { key: `subTitle1Client`,  title: `Personal Details`, group: 1, element: "h3" },
    {
      key: `firstName`,
      type: `text`,
      title: `First Name`,
      group: 1,
      element: "input",
      event: () => {},
    },
    {
      key: `lastName`,
      type: `text`,
      title: `Last Name`,
      group: 1,
      element: "input",
      event: () => {},
    },
    { key: `subTitle2Client`,  title: `Contact `, group: 2, element: "h3" },
    {
      key: `email`,
      type: `text`,
      title: `Email Address`,
      group: 2,
      element: "input",
      event: () => {},
    },
    {
      key: `phoneNumber`,
      type: `text`,
      title: `Phone Number`,
      group: 2,
      element: "input",
      event: () => {},
    },
    { key: `subTitle3Client`, title: `Address `, group: 3, element: "h3" },
    // {
    //   key: `address.country`, //Formik Pointer
    //   options: MemoizedCountries, // array of strings will be mapped as options
    //   type: `text`, // type of the option
    //   title: `Country`, // if using label it will get this title
    //   group: 4, // groups elements with the same value together for styling purposes, forming a block that can be targeted with the CSS selector group4.
    //   element: "select", // element to produce
    //   state: values.address.country, // Formik state
    //   event: handleSetCountry, // get the event from this function.
    //   placeholder: "Choose a Country", // before selection it will show up
    // },
    {
      key: `address.city`,
      type: `text`,
      title: `City`,
      group: 5,
      element: "input",
      event: () => {},
    },
    {
      key: `address.street`,
      type: `text`,
      title: `Street`,
      group: 5,
      element: "input",
      event: () => {},
    },
    {
      key: `address.postalCode`,
      type: `text`,
      title: `Postal Code`,
      group: 5,
      element: "input",
      event: () => {},
    },
  ];

  const searchField: InputField = {
    key: `Search`,
    type: "text",
    title: "Search Client",
    element: `input`,
    group: 1,
    event: () => {}
  };

  const formikBag = useMemo(
    () => ({
      handleChange,
      values,
      handleSubmit,
      errors,
      touched,
      handleBlur,
      setFieldValue,
      resetForm,
    }),
    [handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldValue, resetForm]
  );

  const filterDate = () => {};
  const filterSpentMoney = () => {};

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return {
    data: { clients, fields },
    dataControl: {},
    states: { searchField, mode, selectedClientId },
    setters: { setSelectedClientId },
    formikBag,
  };
};
