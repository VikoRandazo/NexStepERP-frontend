import { useRef, useEffect } from "react";
import { OptionType } from "../../../models/Elements/Option";

export const useSelect = (
  isOpenSelect: boolean,
  setIsOpenSelect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  
  const handleOpenSelectMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsOpenSelect((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef && !selectRef.current?.contains(e.currentTarget as Node)) {
      setIsOpenSelect(false);
    }
  };

  const formatOptions = (options: string[]) => {
    return options.map((option, i) => {
      return { id: i, value: option };
    });
  };

  useEffect(() => {
    document.addEventListener(`click`, handleClickOutside, false);

    return () => {
      document.removeEventListener(`click`, handleClickOutside, false);
    };
  }, []);

  return { 
    handleOpenSelectMenu, formatOptions 
  };
};
