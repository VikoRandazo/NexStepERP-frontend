import { useRef, useEffect } from "react";

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

  useEffect(() => {
    document.addEventListener(`click`, handleClickOutside, false);

    return () => {
      document.removeEventListener(`click`, handleClickOutside, false);
    };
  }, []);

  return { handleOpenSelectMenu };
};
