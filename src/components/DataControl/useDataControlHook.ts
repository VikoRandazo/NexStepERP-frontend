import { useState } from "react";

export const useDataControl = () => {
  
  const [isActivePopover, setIsActivePopover] = useState<boolean>(false);

  return {
    data: {},
    formikBag: {},
    states: { isActivePopover },
    setters: { setIsActivePopover },
    handlers: {},
    utiles: {},
  };
};
