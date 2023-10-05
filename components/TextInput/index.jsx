import axios from "axios";
import { useState } from "react";

import { API_BASE_URL, authHeader } from "@/constants";
import ActionButton from "../ActionButton";

const TextInput = ({
  addMessage,
  onDelete,
  noOfSelectedMessage,
  latestFirst,
  onOrderChange,
}) => {
  const [inputVal, setInputVal] = useState("");

  const handleAddMessage = async () => {
    const addedMessage = await axios.post(
      API_BASE_URL,
      { text: inputVal },
      authHeader
    );
    addMessage(addedMessage.data);
    setInputVal("");
  };

  return (
    <div>
      <div className="text-zinc-500">
        Type something in the box below, then hit "Post"
      </div>
      <div className="flex gap-x-3 mt-2">
        <input
          className="border border-solid border-slate-200 pl-1"
          placeholder="enter message"
          value={inputVal}
          onChange={(evt) => setInputVal(evt.target.value)}
        />
        <ActionButton text="Post!" onClick={handleAddMessage} />
        <ActionButton
          text={`Delete ${
            noOfSelectedMessage ? `${noOfSelectedMessage} messages` : "All"
          }`}
          className="text-red-500 font-bold"
          onClick={onDelete}
        />
        <ActionButton
          text={`Sort by ${latestFirst ? "earliest" : "latest"} first`}
          className="text-blue-500 font-bold"
          onClick={onOrderChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
