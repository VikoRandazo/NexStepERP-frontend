import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../../store/store";
import {
  ClientInteractionDescription,
  InteractionsModeEnum,
} from "../../../../models/shared/InteractionsMode";
import { InputField, InputFieldKeys } from "../../../Elements/Input/InputField";
import { useFormik } from "formik";
import { CustomerType, initClientState } from "../../../../models/CustomerType";
import { validationClient } from "./clientFormValidation";
import instance from "../../../../api/axiosInstance";
import { UiActions } from "../../../../store/slices/ui";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { useEffect } from "react";

export const useClientForm = (props: any) => {
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const { dispatch } = useDispatchHook();
  const fields: InputField[] = [
    { key: "firstName", type: "text", title: "First Name", group: 1 },
    { key: "lastName", type: "text", title: "Last Name", textarea: true, group: 1 },
    { key: "country", type: "text", title: "Country", group: 2 },
    { key: "city", type: "text", title: "City", group: 2 },
    { key: "street", type: "text", title: "Street", group: 2 },
    { key: "postalCode", type: "text", title: "Zip code", group: 3 },
    { key: "email", type: "text", title: "E-mail", group: 4 },
    { key: "phoneNumber", type: "text", title: "Phone Number", group: 3 },
  ];

  const handleChooseDescriptionCase = () => {
    switch (mode) {
      case InteractionsModeEnum.Create:
        return ClientInteractionDescription.Create;

      case InteractionsModeEnum.Edit:
        return ClientInteractionDescription.Edit;
    }
  };

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
    initialValues: initClientState,
    validationSchema: "",
    onSubmit: async () => {
      try {
        console.log("submitted");
        
        let response;
        switch (mode) {
          case InteractionsModeEnum.Create:
            response = await instance.post("http://localhost:5000/clients/new", values);
            break;

          case InteractionsModeEnum.Edit:
            response = await instance.patch(
              `http://localhost:5000/clients/${props.client._id}`,
              values
            );
            break;
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(UiActions.setIsOpen(false));
      }
    },
  });

  useEffect(() => {
    console.log({ ClientFormProps: props });
  }, [props]);

  const handleCloseModal = () => {
    dispatch(UiActions.setIsOpen(false));
  };

  const formikBag = {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  };
  const data = { fields };
  const formControls = { mode };
  const handlers = { handleChooseDescriptionCase, handleCloseModal };
  return { formikBag, formControls, handlers, data };
};
