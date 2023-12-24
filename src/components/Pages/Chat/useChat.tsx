import { v4 as uuid } from "uuid";
import { UserType } from "./UserType";
import { useEffect, useState } from "react";
import { SystemMessageType } from "./SystemMessageType";
import { io } from "socket.io-client";
import { ChatActionsEnum } from "./ChatActionsEnum";
import { useFormik } from "formik";
import { MessageType } from "./MessageType";

export const useChat = () => {

  // ===============================================================================
  // --------- config --------------------------------------------------------------
  // ===============================================================================
  const httpServer = "http://localhost:5000";
  const newSocket = io(httpServer, {
    path: "/chat",
    reconnection: false,
  });

  // Optional: Cleanup on unmount

  // ===============================================================================
  // --------- formik --------------------------------------------------------------
  // ===============================================================================

  const { values, handleChange, setFieldValue, resetForm, handleSubmit } = useFormik({
    initialValues: {
      user: { firstName: "", lastName: "", username: "" },
      message: { id: "", message: "", timestamp: new Date().toISOString() },
    },
    onSubmit: () => {},
  });

  // ===============================================================================
  // --------- useStates -----------------------------------------------------------
  // ===============================================================================
  const [systemMessages, setSystemMessages] = useState<SystemMessageType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [joinedUsers, setJoinedUsers] = useState<UserType[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  // ===============================================================================
  // --------- setters -------------------------------------------------------------
  // ===============================================================================

  // ===============================================================================
  // --------- handlers ------------------------------------------------------------
  // ===============================================================================

  const handleJoinedUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      newSocket.emit(ChatActionsEnum.USER_JOINED, values.user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMessage = () => {
    const messageData = {
      user: values.user,
      message: values.message,
    };
    try {
      newSocket.emit(ChatActionsEnum.MESSAGE, messageData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisconnectedUser = () => {
    try {
      newSocket.emit(ChatActionsEnum.DISCONNECT, values.user);
    } catch (error) {
      console.log(error);
    }
  };

  const joinUser = (user: UserType) => {
    newSocket.auth = { username: values.user.firstName };
    setJoinedUsers((prev) => [...prev, user]);
    setConnected(true);
  };

  const removeUser = (newSocketid: any) => {
    console.log(newSocketid);
  };

  const getMessage = (message: MessageType) => {
    console.log(message.message);

    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    newSocket.on(`user joined`, joinUser);
    return () => {
      newSocket.off(`user joined`, joinUser);
    };
  }, [newSocket]);

  useEffect(() => {
    newSocket.on(`user left`, removeUser);

    return () => {
      newSocket.off(`user left`, removeUser);
    };
  }, [newSocket]);

  useEffect(() => {
    newSocket.on(`message`, getMessage);

    return () => {
      newSocket.off(`message`, getMessage);
    };
  }, [newSocket]);

  return {
    formik: { values, handleChange, handleSubmit, setFieldValue },
    states: { joinedUsers, connected },
    utiles: {
      newSocket,
    },
    handlers: {
      handleJoinedUser,
      handleSendMessage,
    },
    data: { joinedUsers, messages },
  };
};
