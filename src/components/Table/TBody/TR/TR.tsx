import React, { Dispatch, SetStateAction } from "react";
import styles from "./TR.module.scss";
import Td from "../TD/TD";
import Checkbox from "../../../Elements/Checkbox/Checkbox";
import Select from "../../../Elements/Select/Select";
import { useTr } from "./useTr";
import {
  HiArrowsPointingOut,
  HiEllipsisHorizontal,
  HiTrash,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { UiActions } from "../../../../store/slices/ui";
import { entitiesAction } from "../../../../store/slices/entities";
import { ComponentCaseEnum } from "../../../../models/ComponentCase";

interface TrProps<T> {
  item: T;
  hiddenColumns: string[];
  selectAll: boolean;
  hasActions: boolean;
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>;
  isOpenSelectMenu: boolean;
  deleteItem: (product: any) => void;
}

const Tr = <T extends object>({
  item,
  hiddenColumns,
  selectAll,
  hasActions,
  isOpenSelectMenu,
  setIsOpenSelectMenu,
  deleteItem,
}: TrProps<T>) => {
  const {
    isChecked,
    handleCheckbox,
    handleOpenSelectMenu,
    handleChooseAction,
    isActiveSelectMenu,
    handleClick
  } = useTr(item, setIsOpenSelectMenu);

  const { dispatch } = useDispatchHook();


  const actions = [
    {
      name: `Edit`,
      icon: <HiWrenchScrewdriver />,
      action: () => {
        handleChooseAction();
      },
    },
    {
      name: `Delete`,
      icon: <HiTrash />,
      action: () => {
        dispatch(entitiesAction.setProduct(item as any));
        deleteItem(item as T);
      },
    },
  ];

  return (
    <tr className={styles.Tr}>
      <Td children={<Checkbox checked={isChecked} onChange={handleCheckbox} />} />

      {Object.entries(item).map(([key, value], i) => {
        if (!hiddenColumns.includes(key)) {
          return (
            <Td
              key={i}
              value={value}
              customClassName={key === "name" ? styles.productName : ""}
              isNameColumn={key === "name"}
              handleClick={handleClick}
            />
          );
        }
        return null;
      })}
      {hasActions ? (
        <Td
          value={
            <div className={styles.actionsMenu}>
              <span onClick={handleOpenSelectMenu}>
                <HiEllipsisHorizontal />
              </span>
              {isOpenSelectMenu ? <Select isActive={isActiveSelectMenu} options={actions} /> : null}
            </div>
          }
        />
      ) : null}
    </tr>
  );
};

export default Tr;
