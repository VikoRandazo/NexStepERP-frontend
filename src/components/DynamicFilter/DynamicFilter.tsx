import React, { FC, SetStateAction, useEffect, useState } from "react";
import styles from "./DynamicFilter.module.scss";
import Select from "../Elements/Select/Select";
import { OptionType } from "../../models/Elements/Option";
import BtnTransparent from "../Elements/Buttons/Btn-Transparent/Btn-Transparent";
import { useFormik } from "formik";
import BtnSecondary from "../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Popover from "../Elements/Popover/Popover";
import { useDynamicFilter } from "./useDynamicFilter";
import Radio from "../Elements/Radio/Radio";
import Checkbox from "../Elements/Checkbox/Checkbox";

interface DynamicFilterProps {
  type: "checkbox" | "radio" | "range";
  data: any[];

  filtered: (filtered: any) => void;
}

const DynamicFilter: FC<DynamicFilterProps> = ({ data, type, filtered }) => {
  const [isActivePopover, setIsActivePopover] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>(``);

  const handleSetCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    const { selected, name, value } = e.currentTarget.dataset;
    if (name) {
      setSelected(name);
    }
  };

  const {} = useDynamicFilter(`products`, data);
  const sendFiltered = () => {
    filtered(filteredData);
  };

  const handleOpenPopover = () => {
    setIsActivePopover((prev) => !prev);
  };

  const dummyOptions = [
    { id: 1, name: "viko", value: 1 },
    { id: 2, name: "daniella", value: 2 },
    { id: 3, name: "koral", value: 3 },
  ];

  useEffect(() => {
    console.log(selected);
  }, [selected]);
  // const renderFilter = () => {

  //   switch (type) {
  //     case "checkbox":
  //       return <CheckboxFilter />;

  //     case "radio":
  //       return <RadioFilter />;

  //     case "range":
  //       return (<></>
  //         // <RangeFilter
  //         //   title={""}
  //         //   value={{
  //         //     min: 0,
  //         //     max: 0,
  //         //   }}
  //         //   setValue={}
  //         //   min={0}
  //         //   max={0}
  //         //   handleChange={}
  //         // />
  //       );

  //     default:
  //       break;
  //   }
  // };

  return (
    <div className={styles.DynamicFilter}>
      <div className={styles.container}>
        <span className={styles.filterBtn} onClick={handleOpenPopover}>
          <BtnSecondary text="Filters" action={() => {}} icon={<HiAdjustmentsHorizontal />} />
        </span>

        <div className={styles.popoverContainer}>
          <Popover
            isActivePopover={isActivePopover}
            setIsActivePopover={setIsActivePopover}
            children={<Radio selected={selected} event={handleSetCheck} options={dummyOptions} />}
            title={`Filter Data`}
          />
        </div>
      </div>
    </div>
  );
};
export default DynamicFilter;
