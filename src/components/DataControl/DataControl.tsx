import { FC } from "react";
import styles from "./DataControl.module.scss";
import { useDispatchHook } from "../../hooks/useDispatch";
import Popover from "../Elements/Popover/Popover";
import { useDataControl } from "./useDataControlHook";
import DynamicFilter from "../DynamicFilter/DynamicFilter";

export interface DataControlProps {
  data: any;
  formik: any;
}

const DataControl: FC<DataControlProps> = ({ data, formik }) => {
  const { dispatch } = useDispatchHook();
  const { states, setters, handlers } = useDataControl();

  const { isActivePopover } = states;
  const { setIsActivePopover } = setters;
  const { handleOpenPopover } = handlers;

  const filteredData = (filtered: any) => {
    console.log(filtered);
  };

  return (
    <div className={styles.DataControl}>

        <DynamicFilter
          type={"checkbox"}
          data={data}
          filtered={filteredData}
        />
    </div>
  );
};

export default DataControl;
