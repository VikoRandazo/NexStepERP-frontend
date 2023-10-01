import { useDispatch } from "react-redux";

export const useDispatchHook = () => {
  const dispatch = useDispatch();
  return { dispatch };
};
