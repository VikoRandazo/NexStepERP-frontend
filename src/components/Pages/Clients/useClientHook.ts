import { useFormik } from "formik";
import { CustomerType, initClientState } from "../../../models/CustomerType";
import { InputField } from "../../Elements/Input/InputField";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import { HiArrowDown } from "react-icons/hi2";
import instance from "../../../api/axiosInstance";
import { useEffect, useState } from "react";
import clientValidationSchema from "./clientValidation";
import { UiActions } from "../../../store/slices/ui";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { InteractionsModeEnum } from "../../../models/shared/InteractionsMode";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { EntityEnum } from "../../../models/EntityEnum";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
import { entitiesAction } from "../../../store/slices/entities";

export const useClientHook = () => {
  const { dispatch } = useDispatchHook();
  const [clients, setClients] = useState<CustomerType[]>([]);
  const [filteredClients, setFilteredClients] = useState<CustomerType[]>(clients);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [country, setCountry] = useState<string>("None");

  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);

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
    setCountry(innerText);
  };

  const fields: InputField[] = [
    { key: `subTitle1Client`, type: `text`, title: `Personal Details`, group: 1, element: "h3" },
    { key: `firstName`, type: `text`, title: `First Name`, group: 1, element: "input" },
    { key: `lastName`, type: `text`, title: `Last Name`, group: 1, element: "input" },
    { key: `subTitle2Client`, type: `text`, title: `Contact `, group: 2, element: "h3" },
    { key: `email`, type: `text`, title: `Email Address`, group: 2, element: "input" },
    { key: `phoneNumber`, type: `text`, title: `Phone Number`, group: 2, element: "input" },
    { key: `subTitle3Client`, type: `text`, title: `Address `, group: 3, element: "h3" },
    {
      key: `address.country`,
      type: `text`,
      title: `Country`,
      group: 4,
      element: "select",
      state: country,
      setState: setCountry,
      event: handleSetCountry,
      placeholder: SelectPlaceHolderEnum.COUNTRY,
    },
    { key: `address.city`, type: `text`, title: `City`, group: 5, element: "input" },
    { key: `address.street`, type: `text`, title: `Street`, group: 5, element: "input" },
    { key: `address.postalCode`, type: `text`, title: `Postal Code`, group: 5, element: "input" },
  ];

  const searchField: InputField = {
    key: `Search`,
    type: "text",
    title: "Search Client",
    element: `input`,
    group: 1,
  };

  const filterDate = () => {};
  const filterSpentMoney = () => {};

  const filterOptions = [
    { name: FilterByEnum.NONE, icon: HiArrowDown as React.ElementType, action: () => {} },
    { name: FilterByEnum.DATE, icon: null, action: filterDate },
    { name: FilterByEnum.MOENY_SPENT, icon: null, action: filterSpentMoney },
  ];

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    setFilteredClients(clients);
    dispatch(entitiesAction.setClients(clients));
  }, [clients]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    setFieldValue(`address.country`, country);
  }, [country]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return {
    data: { clients, fields, filteredClients },
    dataControl: { filterOptions },
    states: { searchField, mode, selectedClientId },
    setters: { setFilteredClients, setSelectedClientId },
    formikBag: {
      handleChange,
      values,
      handleSubmit,
      errors,
      touched,
      handleBlur,
      setFieldValue,
      resetForm,
    },
  };
};
