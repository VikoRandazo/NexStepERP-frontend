import React, { FC, useState } from 'react';
import { useUserAction } from './useUserHook';

type User = {
  username: string;
  email?: string;
};

type UserComponentProps = {
  user: User;
};

export type UserConnection =
  | { actionType: "login"; username: string; password: string }
  | { actionType: "logout" }
  | { actionType: "register"; username: string; password: string; email: string };

const UserComponent: FC<UserComponentProps> = ({ user }) => {
  const initialAction: UserConnection = { actionType: "logout" };
  
  const { userAction, setUserAction } = useUserAction(initialAction);

  const handleLogin = () => {
    setUserAction({ actionType: "login", username: user.username, password: "securepassword" });
  };

  const handleLogout = () => {
    setUserAction({ actionType: "logout" });
  };

  const handleRegister = () => {
    setUserAction({
      actionType: "register",
      username: user.username,
      password: "securepassword",
      email: user.email || ""
    });
  };

  return (
    <div>
      <h1>Current Action: {userAction.actionType}</h1>
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserComponent;
