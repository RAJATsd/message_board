import { convertTime } from "@/utils/convertTime";
import ActionButton from "../ActionButton";

const MessageInfo = ({ message }) => {
  const { source, text, timestamp } = message || {};

  return (
    <div className="border border-l-0 border-r-0 px-1 py-3">
      <div className="flex gap-x-2">
        <div className="font-bold">~ {source}</div>
        <div>-</div>
        <div className="text-slate-400">{convertTime(timestamp)}</div>
        <div>
          <ActionButton
            text="Delete"
            className="underline border-none text-blue-700"
          />
        </div>
      </div>
      <div className="mt-1">{text}</div>
    </div>
  );
};

export default MessageInfo;
