import { FC, useEffect, useState } from "react";
import styles from "./DataControl.module.scss";
import { InputField } from "../Elements/Input/InputField";
import { useDispatchHook } from "../../hooks/useDispatch";
import Popover from "../Elements/Popover/Popover";
import { useDataControl } from "./useDataControlHook";
import { PopoverTitleEnum } from "../Elements/Popover/PopoverTitleEnum";
import DynamicFilter from "../DynamicFilter/DynamicFilter";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { appSettingsActions } from "../../store/slices/appSettings";

export interface DataControlProps {
  data: any;
  filterFields: InputField[];
  filterFunctions: { [key: string]: (data: any[], innerText: string) => any[] };
  formikbag?: any;
  initStateFormik: { [key: string]: any | { [key: string]: any } };
  handleFilterData?: (data: any) => void;
}

const DataControl: FC<DataControlProps> = ({
  data,
  formikbag,
  handleFilterData,
  filterFields,
  filterFunctions,
  initStateFormik,
}) => {
  const { dispatch } = useDispatchHook();
  const { states, setters } = useDataControl();

  const { isActivePopover } = states;
  const { setIsActivePopover } = setters;

  const handleOpenPopover = () => {
    dispatch(appSettingsActions.setPageName("Filter"));
    setIsActivePopover(true);
  };

  return (
    <div className={styles.DataControl}>
      <div className={styles.filter}>
        <span className={styles.filterPopOver} onClick={handleOpenPopover}>
          <HiAdjustmentsHorizontal />
        </span>
        <span className={styles.popover}>
          <Popover
            isActivePopover={isActivePopover}
            setIsActivePopover={setIsActivePopover}
            title={PopoverTitleEnum.FILTER}
            children={
              <DynamicFilter
                data={data}
                fields={filterFields}
                getFilteredData={handleFilterData}
                filterFunctions={filterFunctions}
                initStateFormik={initStateFormik}
              />
            }
          />
        </span>
      </div>
    </div>
  );
};

export default DataControl;
