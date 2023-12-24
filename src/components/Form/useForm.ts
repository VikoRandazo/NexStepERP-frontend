import { useSelector } from "react-redux";
import { InputField } from "../Elements/Input/InputField";
import { StoreRootTypes } from "../../store/store";
import { EntityEnum } from "../../models/EntityEnum";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import { useEffect, useState } from "react";
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import { useDispatchHook } from "../../hooks/useDispatch";
import { Styles } from "../../models/shared/Styles";
import { SelectPlaceHolderEnum } from "../../models/SelectPlaceHolderEnum.";

export const useForm = (
  fields: InputField[],
  styles: Styles,
  entity: EntityEnum | null,
  setIsActiveModal?: React.Dispatch<React.SetStateAction<boolean>>,
  customFormName?: string
) => {
  const { dispatch } = useDispatchHook();
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const urlPath = useSelector((state: StoreRootTypes) => state.appSettings.pageName);
  const [buttonText, setButtonText] = useState<BtnActionsTextEnum>(BtnActionsTextEnum.CREATE);
  const [selectPlaceHolder, setSelectPlaceHolder] = useState<SelectPlaceHolderEnum>(
    SelectPlaceHolderEnum.COUNTRY
  );
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const [selectStates, setSelectStates] = useState<{ [key: string]: boolean }>({});

  const handleOpenSelect = (key:string) => {
    setSelectStates((prev => ({...prev, [key]: !prev[key]})))
  }

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
    if (setIsActiveModal) {
      setIsActiveModal(false);
    }
  };

  const handleClassName = (index: number) => {
    if (customFormName) {
      return `${styles.group} ${styles[`group${index + 1}`]} ${styles[customFormName]}`;
    } else {
      return `${styles.group} ${styles[`group${index + 1}`]} ${styles[urlPath]}`;
    }
  };

  useEffect(() => {
    setBtnTextAccordingToMode();
  }, [mode]);

  return {
    data: { buttonText, groupedFields },
    handlers: { handleCloseModal, handleClassName, handleOpenSelect },
    events: {},
    states: { selectPlaceHolder, isOpenSelect, selectStates },
    setters: { setIsOpenSelect },
  };
};
