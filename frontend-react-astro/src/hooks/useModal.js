import { useState } from "react";

function useModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showModal = (msg) => {
    setMessage(msg);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setMessage("");
  };

  return {
    isVisible,
    message,
    showModal,
    hideModal,
  };
}

export default useModal;
