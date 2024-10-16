import { useState } from "react";

function useSignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
    phone,
    setPhone,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    businessName,
    setBusinessName,
    isTermsAccepted,
    setIsTermsAccepted,
    isButtonDisabled,
    setIsButtonDisabled,
  };
}

export default useSignUpForm;
