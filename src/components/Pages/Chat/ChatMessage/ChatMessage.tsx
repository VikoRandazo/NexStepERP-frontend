import React, { FC } from "react";
import styles from "./ChatMessage.module.scss";
import { MessageType } from "../MessageType";

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const time = new Date(message.timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedTime = `${hours}:${minutes}`;

  const username= `vikoran`
  return (
    <div className={styles.ChatMessage}>
      <div className={styles.username}>{message.username}</div>
      <div className={styles.messageContainer}>
        
        <div className={styles.message}>
          <span>{message.message}</span>
        </div>

        <div className={styles.time}>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
