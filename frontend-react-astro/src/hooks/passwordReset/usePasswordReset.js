import { useState } from "react";

function usePasswordReset() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    showPassword,
    togglePasswordVisibility,
    setIsButtonDisabled,
    isButtonDisabled,
  }; 
}
export default usePasswordReset;
