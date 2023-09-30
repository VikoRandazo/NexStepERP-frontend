import React, { Dispatch, SetStateAction } from "react";
import styles from "./TBody.module.scss";
import TR from "./TR/TR";
import { InteractionsMode } from "../../../models/shared/InteractionsMode";

interface TBodyProps<T> {
  data: T[];
  hiddenColumns: string[];
  selectAll: boolean;
  setSelectedRows: any;
  hasActions: boolean;
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>;
  isOpenSelectMenu: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInteractionsMode: React.Dispatch<React.SetStateAction<InteractionsMode>>
}

const TBody = <T extends object>({
  data,
  hiddenColumns,
  selectAll,
  setSelectedRows,
  hasActions,
  setIsOpenSelectMenu,
  isOpenSelectMenu,
  setIsOpenModal,
  setInteractionsMode
}: TBodyProps<T>) => {

  return (
    <tbody className={styles.TBody}>
      {data.map((item: T, i) => {
        return (
          <TR<T>
            key={i}
            item={item}
            hiddenColumns={hiddenColumns}
            selectAll={selectAll}
            setSelectedRows={setSelectedRows}
            hasActions={hasActions}
            setIsOpenSelectMenu={setIsOpenSelectMenu}
            isOpenSelectMenu={isOpenSelectMenu}
            setIsOpenModal={setIsOpenModal}
            setInteractionsMode={setInteractionsMode}
          />
        );
      })}
    </tbody>
  );
};

export default TBody;
