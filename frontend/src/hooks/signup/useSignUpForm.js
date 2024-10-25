import { useState } from "react";

function useSignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });
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
    companyName,
    setCompanyName,
    address,
    setAddress,
    isTermsAccepted,
    setIsTermsAccepted,
    isButtonDisabled,
    setIsButtonDisabled,
  };
}

export default useSignUpForm;
