import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { InputField } from "../../Elements/Input/InputField";
import instance from "../../../api/axiosInstance";
import { CustomerType } from "../../../models/CustomerType";
import { useNavigate } from "react-router-dom";
import { initShoppingCart } from "../../../store/slices/shoppingCart";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { Sale } from "../../../models/Sale";
import { initSelectState } from "../../Elements/Select/Select";

export const useCheckout = () => {
  // ===============================================================================
  // --------- useStates -----------------------------------------------------------
  // ===============================================================================

  const [fields, setFields] = useState<InputField[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [transformedClients, setTransformedClients] = useState<any[]>([]);
  const [clientsId, setClientsId] = useState<string>("");
  const [cartApproved, setCartApproved] = useState<boolean>(false);

  const [isOpenSelectForChoosingClient, setIsOpenSelectForChoosingClient] =
    useState<boolean>(false);

  const clients = useSelector((state: StoreRootTypes) => state.entities.clients);
  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);

  // ===============================================================================
  // --------- Hooks ---------------------------------------------------------------
  // ===============================================================================

  const navigate = useNavigate();

  // ===============================================================================
  // ---------- Functions ----------------------------------------------------------
  // ===============================================================================

  const { values, handleSubmit, setFieldValue, handleChange } = useFormik({
    initialValues: {
      isNewClient: 1,
      client: initSelectState,
      shoppingCart: initShoppingCart,
    },
    onSubmit: () => {},
  });

  const getClients = useCallback(async () => {
    try {
      const response = await instance.get(`clients/all`);
      const names = response.data.map((client: CustomerType) => {
        return `${client.firstName} ${client.lastName}`;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const transformClients = () => {
    const selectObjectsArray = clients.actions.setClients.map((client) => {
      return { id: client._id, value: `${client.firstName} ${client.lastName}` };
    });

    setTransformedClients(selectObjectsArray);
  };

  const handleSelectClient = (e: React.MouseEvent<HTMLLIElement>) => {
    const { id, dataset } = e.currentTarget;
    const { value } = dataset;

    setFieldValue(`client`, id);
  };

  const handleShoppingCart = () => {
    setCartApproved(true);
    setFieldValue(`shoppingCart`, shoppingCart);
  };
  const [readyForPost, setReadyForPost] = useState<Sale>();

  const preparePurchaseForPosting = () => {
    const products = values.shoppingCart.products.map((product) => {
      const { price, _id } = product.product;
      const readyForPost = { pid: _id, price: price, quantity: product.quantity };
      return readyForPost;
    });

    setReadyForPost(() => {
      return {
        date: values.shoppingCart.lastUpdated,
        productsSold: products,
        totalAmount: values.shoppingCart.totalPrice,
        customerId: values.client.value,
      };
    });
  };

  const handleProccessPurchase = async () => {
    try {
      const response = await instance.post(`/sales/${values.client}`, readyForPost);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preparePurchaseForPosting();
  }, [values]);

  // --------- steps -------------------------------------------------------------
  const steps = [`step1`, `step2`];

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setCurrentStep((prev) => prev);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => prev);
    }
  };

  type FieldsStructureType = {
    step1: InputField[];
    step2: { existingClient: InputField[]; newClient: InputField[]; buttons: InputField[] };
  };

  const fieldsStructure: FieldsStructureType = {
    step1: [
      { key: "chooseClientTitle", title: "Choose a Client", group: 1, element: "h3" },
      {
        key: `isNewClient`,
        type: "text",
        value: 0,
        title: "Exist",
        group: 2,
        element: "radio",
        state: values.isNewClient,
        event: handleChange,
      },
      {
        key: `isNewClient`,
        type: "text",
        value: 1,
        title: "New Client",
        group: 2,
        element: "radio",
        state: values.isNewClient,
        event: handleChange,
      },

      {
        key: `nextStep`,
        element: `secondaryButton`,
        action: handleNextStep,
        innerText: `Next Step`,
        group: 3,
        event: () => {},
      },
    ],

    step2: {
      existingClient: [
        { key: "existingClientTitle", title: "Choose a Client", group: 1, element: "h3" },
        {
          key: "client",
          options: transformedClients,
          type: "text",
          group: 2,
          element: "select",
          isOpen: isOpenSelectForChoosingClient,
          isSelected: values.client,
          event: handleSelectClient,
          placeholder: "Choose a Client",
        },
      ],

      newClient: [{ key: "newClientTitle", title: "New Client", group: 1, element: "h3" }],
      // newClient : {title, client: CustomerType, prevStep Button, nextStepButton}
      buttons: [
        {
          key: `nextStep`,
          element: `secondaryButton`,
          action: handleProccessPurchase,
          innerText: `Next Step`,
          group: 7,
          event: () => {},
        },
        {
          key: `prevStep`,
          element: `secondaryButton`,
          action: handlePrevStep,
          innerText: `Prev Step`,
          group: 7,
          event: () => {},
        },
      ],
    },
  };

  const handleSetFields = () => {
    setFields(fieldsStructure.step1);

    if (currentStep === 2) {
      console.log(values);

      if (+values.isNewClient === 0) {
        const concatedFields = fieldsStructure.step2.existingClient.concat(
          fieldsStructure.step2.buttons
        );

        setFields(concatedFields);
      } else {
        const concatedFields = fieldsStructure.step2.newClient.concat(
          fieldsStructure.step2.buttons
        );

        setFields(concatedFields);
      }
    }
  };

  // ===============================================================================
  // --------- useEffects ----------------------------------------------------------
  // ===============================================================================

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    console.log(currentStep);

    handleSetFields();
  }, [currentStep]);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  useEffect(() => {
    transformClients();
  }, [clients]);

  useEffect(() => {
    console.log(transformedClients);
  }, [transformedClients]);

  return {
    states: { currentStep, cartApproved },
    setters: { setCurrentStep },
    utiles: { fields, clients },
    formikBag: { values, handleSubmit, handleChange, setFieldValue },
    functions: { handleShoppingCart },
  };
};
