import React, { Dispatch, SetStateAction } from "react";
import styles from "./TBody.module.scss";
import TR from "./TR/TR";
import { useDispatchHook } from "../../../hooks/useDispatch";
interface TBodyProps<T> {
  data: T[];
  hiddenColumns: string[];
  selectAll: boolean;
  hasActions: boolean;
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>;
  isOpenSelectMenu: boolean;
}

const TBody = <T extends object>({
  data,
  hiddenColumns,
  selectAll,
  hasActions,
  setIsOpenSelectMenu,
  isOpenSelectMenu,
}: TBodyProps<T>) => {
  const { dispatch } = useDispatchHook();
  return (
    <tbody className={styles.TBody}>
      {data.map((item: T, i) => {
        return (
          <TR<T>
            key={i}
            item={item}
            hiddenColumns={hiddenColumns}
            selectAll={selectAll}
            hasActions={hasActions}
            setIsOpenSelectMenu={setIsOpenSelectMenu}
            isOpenSelectMenu={isOpenSelectMenu}
          />
        );
      })}
    </tbody>
  );
};

export default TBody;
