import React, { FC, ReactNode, useEffect, useRef } from "react";
import styles from "./TD.module.scss";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { UiActions } from "../../../../store/slices/ui";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import { entitiesAction } from "../../../../store/slices/entities";

interface TdProps<T> {
  value?: T;
  children?: ReactNode;
  customClassName?: string;
  isNameColumn?: boolean;
  handleClick?: any
}

const Td = <T extends ReactNode>({
  value,
  children,
  customClassName,
  isNameColumn,handleClick
}: TdProps<T>) => {
  const { dispatch } = useDispatchHook();
  const pref = useRef<HTMLParagraphElement>(null);



  useEffect(() => {
    if (customClassName) {
      pref.current?.classList.add(customClassName);
    }
  }, [customClassName]);
  return (
    <td className={styles.Td}>
      <div className={styles.container}>
        <span
          ref={pref}
          className={customClassName}
          onClick={isNameColumn ? handleClick : undefined}
        >
          {children ? children : value}
        </span>
      </div>
    </td>
  );
};

export default Td;
