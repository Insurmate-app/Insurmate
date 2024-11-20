import { useState } from "react";

function useSpinner() {
  const [isSpinnerVisible, setSpinnerVisible] = useState(false);

  const activateSpinner = () => setSpinnerVisible(true);
  const deactivateSpinner = () => setSpinnerVisible(false);

  return {
    isSpinnerVisible,
    setSpinnerVisible,
    activateSpinner,
    deactivateSpinner,
  };
}

export default useSpinner;
