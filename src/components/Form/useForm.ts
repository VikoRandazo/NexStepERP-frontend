import { useSelector } from "react-redux";
import { InputField } from "../Elements/Input/InputField";
import { StoreRootTypes } from "../../store/store";
import { EntityEnum } from "../../models/EntityEnum";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import { useEffect, useState } from "react";
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { Styles } from "../../models/shared/Styles";

export const useForm = (
  fields: InputField[],
  styles: Styles,
  entity: EntityEnum | null,
  selectElementEvent: (e: React.MouseEvent<HTMLLIElement>) => string
) => {
  const { dispatch } = useDispatchHook();
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const [buttonText, setButtonText] = useState<BtnActionsTextEnum>(BtnActionsTextEnum.CREATE);

  const setBtnTextAccordingToMode = () => {
    switch (mode) {
      case InteractionsModeEnum.Create:
        setButtonText(BtnActionsTextEnum.CREATE);
        break;
      case InteractionsModeEnum.Edit:
        setButtonText(BtnActionsTextEnum.UPDATE);
        break;
      default:
        return InteractionsModeEnum.Create;
    }
  };

  const groupedFields = fields.reduce<Record<number, InputField[]>>((acc, field) => {
    if (!acc[field.group]) {
      acc[field.group] = [];
    }
    acc[field.group].push(field);
    return acc;
  }, {});

  const handleCloseModal = () => {
    dispatch(UiActions.setIsOpen(false));
  };

  const handleClassName = (index: number) => {
    switch (entity) {
      case EntityEnum.Clients:
        return `${styles.group} ${styles[`group${index + 1}`]} ${styles.client}`;

      case EntityEnum.Products:
        return `${styles.group} ${styles[`group${index + 1}`]} ${styles.product}`;

      case EntityEnum.Sales:
        return `${styles.group} ${styles[`group${index + 1}`]} ${styles.sale}`;

      default:
        return `${styles.group} ${styles[`group${index + 1}`]}`;
    }
  };

  // const optionEvent = (e: React.MouseEvent<HTMLLIElement>) => {
  //   const { innerText } = e.currentTarget;
  //   return innerText;
  // };

  useEffect(() => {
    setBtnTextAccordingToMode();
  }, [mode]);

  return {
    data: { buttonText, groupedFields },
    handlers: { handleCloseModal, handleClassName },
    events: {},
  };
};
