import { useState } from "react";

function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    setIsButtonDisabled,
    isButtonDisabled,
  };
}

export default useLoginForm;
