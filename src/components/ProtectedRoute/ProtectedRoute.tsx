import React, { FC, ReactElement, useEffect, useState } from "react";
import styles from "./ProtectedRoute.module.scss";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";
import instance from "../../api/axiosInstance";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UserAuth, userAuthActions } from "../../store/slices/auth";
import { AxiosResponse } from "axios";
import Login from "../Auth/Login/Login";
import Loader from "../Elements/Loader/Loader";

interface ProtectedRouteProps {
  children: ReactElement;
}

type TokenValidationResponse = {
  verified: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    iat: number;
  };
  user_verified: boolean;
};




const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { dispatch } = useDispatchHook();

  const [token, setToken] = useState<{ token: string }>({ token: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user_verified = useSelector((state: StoreRootTypes) => state.userAuth.user_verified);

  const checkTokenValidity = async () => {
    try {
      const response = await instance.post(`/auth/token_validation`, token);
      const { data }: AxiosResponse<TokenValidationResponse> = response;
      const { user_verified, verified } = data;

      if (token.token && user_verified) {
        const { iat, ...restUser } = verified;

        const user: UserAuth = {
          token: token.token,
          ...restUser,
          user_verified,
        };

        dispatch(userAuthActions.setUser(user));
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 3000
      );

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };




  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    checkTokenValidity();
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem(`token`);

    if (storedToken) {
      setToken({ token: storedToken });
    }
  }, []);





  if (isLoading) {
    return <Loader />;
  }

  return <div className={styles.ProtectedRoute}>{user_verified ? children : <Login />}</div>;
};

export default ProtectedRoute;
