import { useNavigate } from "react-router-dom";

export const useNavigateHook = () => {
  const navigate = useNavigate();
  return { navigate };
};
