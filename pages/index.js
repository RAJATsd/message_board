import DeleteModal from "@/components/DeleteModal";
import MessageInfo from "@/components/MessageInfo";
import TextInput from "@/components/TextInput";
import { API_BASE_URL, authHeader } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [messageList, setMessageList] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestFirst, setLatestFirst] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const messages = await axios.get(API_BASE_URL, authHeader);
    setMessageList(messages.data);
    setLoading(false);
  };

  const addMessage = (newMessage) => {
    const newMessageList = [...messageList, newMessage];
    setMessageList(newMessageList);
  };

  const handleDeleteMessage = async (messageIdArray) => {
    setLoading(true);
    for (let messageId of messageIdArray) {
      await axios.delete(`${API_BASE_URL}${messageId}`, authHeader);
    }

    const messageIdSet = new Set(messageIdArray);
    const newMessageList = messageList.filter(
      (message) => !messageIdSet.has(message.id)
    );

    setMessageList(newMessageList);
    setLoading(false);
  };

  const deleteAllMessage = () => {
    const allMessageIds = messageList.map((message) => message.id);
    handleDeleteMessage(allMessageIds);
  };

  const handleCheckboxClick = (messageId) => {
    const doesIdExist = selectedMessage.find((mId) => mId === messageId);
    const updatedSelection = doesIdExist
      ? selectedMessage.filter((mId) => mId !== messageId)
      : [...selectedMessage, messageId];
    setSelectedMessage(updatedSelection);
  };

  const handleDeleteConfirmation = () => {
    if (selectedMessage.length) {
      handleDeleteMessage(selectedMessage);
      setSelectedMessage([]);
    } else {
      deleteAllMessage();
    }
    setOpenModal(false);
  };

  const renderMessageList = () => {
    const listToRender = latestFirst
      ? messageList.toSorted(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
      : messageList;

    return listToRender.map((message) => (
      <MessageInfo
        key={message.id}
        message={message}
        deleteMessage={handleDeleteMessage}
        onCheckboxClick={handleCheckboxClick}
        checked={selectedMessage.includes(message.id)}
      />
    ));
  };

  return (
    <div className="p-5">
      <div className="text-3xl font-semibold">Chatter</div>
      <div className="mt-2">
        <TextInput
          addMessage={addMessage}
          onDelete={() => setOpenModal(true)}
          noOfSelectedMessage={selectedMessage.length}
          latestFirst={latestFirst}
          onOrderChange={() => setLatestFirst((prev) => !prev)}
        />
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="text-3xl">Loading ...</div>
        ) : (
          renderMessageList()
          // messageList.map((message) => (
          //   <MessageInfo
          //     key={message.id}
          //     message={message}
          //     deleteMessage={handleDeleteMessage}
          //     onCheckboxClick={handleCheckboxClick}
          //     checked={selectedMessage.includes(message.id)}
          //   />
          // ))
        )}
      </div>
      <DeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onDelete={handleDeleteConfirmation}
      />
    </div>
  );
}
