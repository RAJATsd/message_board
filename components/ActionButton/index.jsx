const ActionButton = ({ text, className, onClick }) => {
  return (
    <button
      className={`border border-solid border-slate-200 px-2 rounded ${
        className || ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
