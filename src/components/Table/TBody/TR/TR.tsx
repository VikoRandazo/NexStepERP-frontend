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

interface TrProps<T> {
  item: T;
  hiddenColumns: string[];
  selectAll: boolean;
  hasActions: boolean;
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>;
  isOpenSelectMenu: boolean;
}

const Tr = <T extends object>({
  item,
  hiddenColumns,
  selectAll,
  hasActions,
  isOpenSelectMenu,
  setIsOpenSelectMenu,
}: TrProps<T>) => {
  const { isChecked, handleCheckbox, handleOpenSelectMenu, isActiveSelectMenu } = useTr(
    item,
    setIsOpenSelectMenu
  );

  const { dispatch } = useDispatchHook();
  const actions = [
    {
      name: `Open`,
      icon: <HiArrowsPointingOut />,
      action: () => {
        dispatch(UiActions.setIsOpen(true));
        dispatch(UiActions.setMode(InteractionsModeEnum.ReadOnly));
        const modalContent = dispatch(
          UiActions.setModalType({ modalType: `ProductForm`, productId: (item as any)._id })
        );
      },
    },
    {
      name: `Edit`,
      icon: <HiWrenchScrewdriver />,
      action: () => {
        dispatch(UiActions.setMode(InteractionsModeEnum.Edit));
        dispatch(UiActions.setIsOpen(true));
        const modalContent = dispatch(
          UiActions.setModalType({ modalType: `ProductForm`, productId: (item as any)._id })
        );
      },
    },
    {
      name: `Delete`,
      icon: <HiTrash />,
      action: () => {},
    },
  ];
  return (
    <tr className={styles.Tr}>
      <Td children={<Checkbox checked={isChecked} onChange={handleCheckbox} />} />

      {Object.entries(item).map(([key, value], i) => {
        if (!hiddenColumns.includes(key)) {
          return <Td key={i} value={value} />;
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
