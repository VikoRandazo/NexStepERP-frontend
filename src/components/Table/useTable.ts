import { useEffect, useState } from "react";

export const useTable = <T extends unknown>(columns: string[], valueRows: T[]) => {
  const [hiddens, setHiddens] = useState<string[]>(["id"]);

  return { states: { hiddens }, setters: { setHiddens } };
};
