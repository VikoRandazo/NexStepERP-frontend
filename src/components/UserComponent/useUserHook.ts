import { useState, useEffect } from 'react';
import { UserConnection } from './UserComponent';

export const useUserAction = (initialAction: UserConnection) => {
  const [userAction, setUserAction] = useState<UserConnection>(initialAction);

  useEffect(() => {
    console.log("User action has changed:", userAction);
    switch (userAction.actionType) {
      case "login":
        console.log(`Logging in user ${userAction.username}...`);
        break;
      case "logout":
        console.log("Logging out...");
        break;
      case "register":
        console.log(`Registering user ${userAction.username} with email ${userAction.email}...`);
        break;
    }
  }, [userAction]);

  return {
    userAction,
    setUserAction
  };
};
