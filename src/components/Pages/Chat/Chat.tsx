import React, { FC, useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import { useChat } from "./useChat";
import { UserType } from "./UserType";
import { MessageType } from "./MessageType";
import { useFormatDate } from "../../../hooks/useFormatDate";
import Form from "../../Form/Form";
import { InputField } from "../../Elements/Input/InputField";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { UiActions } from "../../../store/slices/ui";
import { appSettingsActions } from "../../../store/slices/appSettings";
import { HiForward } from "react-icons/hi2";
import ChatMessage from "./ChatMessage/ChatMessage";

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const { handlers, utiles, states, formik, data } = useChat();

  const { handleJoinedUser, handleSendMessage } = handlers;
  const { newSocket } = utiles;
  const { connected } = states;
  const { joinedUsers, messages } = data;
  const { values, handleChange } = formik;

  const { dispatch } = useDispatchHook();

  const inputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  
  const sendBtnEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  const fields: InputField[] = [
    {
      key: `message.message`,
      title: ` message`,
      group: 1,
      element: `input`,
      event: inputEvent,
    },
    {
      key: `sendButton`,
      innerText: ``,
      group: 1,
      element: `secondaryButton`,
      icon: <HiForward />,
      event: sendBtnEvent,
      action: handleSendMessage,
    },
  ];

  const username = "vikoran";

  useEffect(() => {
    dispatch(appSettingsActions.setPageName(`Chat`));
  });
  return (
    <div className={styles.Chat}>
      <div className={styles.room}>
        <span>{`lorem`}</span>
      </div>
      {connected ? (
        <>
          {messages.map((message: MessageType) => {
            return <ChatMessage message={message} />;
          })}
          <Form fields={fields} formikBag={formik} />
          {/* <form onSubmit={handleSendMessage}>
            <input
              name="message.message"
              placeholder={`your message as ${values.user.firstName}`}
              onChange={handleChange}
            />
            <button type={`submit`}>send</button>

            <ul className={styles.messages}>
              {messages.map((message: MessageType) => {

                return (
                  <li>

                    <div className={styles.message}>
                      <p className={styles.sender}>{message.username}</p>
                      <span className={styles.self}>{message.message}</span>
                      <span className={styles.time}>{formattedTime}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </form> */}
        </>
      ) : (
        <>
          <form onSubmit={handleJoinedUser}>
            <h3>insert your name</h3>
            <input name="user.firstName" onChange={handleChange} />
            <input name="user.lastName" onChange={handleChange} className={styles.guest} />
            <button type={`submit`}>join</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chat;
