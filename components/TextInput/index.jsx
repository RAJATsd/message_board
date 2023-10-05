import { API_BASE_URL, authHeader } from "@/constants";
import axios from "axios";
import { useState } from "react";
import ActionButton from "../ActionButton";

const TextInput = ({ addMessage }) => {
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
        <ActionButton text="Delete All" className="text-red-500 font-bold" />
      </div>
    </div>
  );
};

export default TextInput;
