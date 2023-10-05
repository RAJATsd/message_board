import MessageInfo from "@/components/MessageInfo";
import TextInput from "@/components/TextInput";
import { API_BASE_URL, authHeader } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const messages = await axios.get(API_BASE_URL, authHeader);
    setMessageList(messages.data);
  };

  const addMessage = (newMessage) => {
    const newMessageList = [newMessage, ...messageList];
    setMessageList(newMessageList);
  };

  const handleDeleteMessage = async (messageIdArray) => {
    for (let messageId of messageIdArray) {
      await axios.delete(`${API_BASE_URL}${messageId}`, authHeader);
    }

    const messageIdSet = new Set(messageIdArray);
    const newMessageList = messageList.filter(
      (message) => !messageIdSet.has(message.id)
    );

    setMessageList(newMessageList);
  };

  return (
    <div className="p-5">
      <div className="text-3xl font-semibold">Chatter</div>
      <div className="mt-2">
        <TextInput addMessage={addMessage} />
      </div>
      <div className="mt-3">
        {messageList.map((message) => (
          <MessageInfo
            key={message.id}
            message={message}
            deleteMessage={handleDeleteMessage}
          />
        ))}
      </div>
    </div>
  );
}
