import { useEffect, useState } from "react";

export const useDataControl = () => {
  
  const [isActivePopover, setIsActivePopover] = useState<boolean>(false);

const handleOpenPopover = () => {
  setIsActivePopover((prev) => !prev)
}

useEffect(() => {
console.log(isActivePopover);
},[isActivePopover])

  return {
    data: {},
    formikBag: {},
    states: { isActivePopover },
    setters: { setIsActivePopover },
    handlers: {handleOpenPopover},
    utiles: {},
  };
};
