import { useEffect, useRef } from "react";

const DeleteModal = ({ open, onClose, onDelete }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return open ? (
    <div className="fixed w-screen h-screen left-0 top-0 grid place-items-center bg-black/70 ">
      <div ref={ref} className="bg-white rounded-lg p-2 w-96">
        <div>Are you sure you want to delete ?</div>
        <div className="flex justify-end mt-8">
          <div className="flex items-center gap-x-2">
            <button
              className="border-solid border border-gray-400 rounded-lg px-4 py-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="border-solid border border-gray-400 rounded-lg px-4 py-1 bg-red-400 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteModal;
