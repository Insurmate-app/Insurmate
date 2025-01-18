import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

const token_name = import.meta.env.VITE_TOKEN_NAME;

// Set the Bearer Token
export const storeToken = (token) => {
  cookies.set(token_name, token, {
    path: "/",
  });
};

// Get the Bearer Token
export const getToken = () => {
  return cookies.get(token_name) || null;
};

// Delete the Bearer Token
export const deleteToken = () => {
  cookies.remove(token_name, { path: "/" });
};

export const isTokenValid = () => {
  const token = cookies.get(token_name);

  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT
    const expirationTime = decodedToken.exp * 1000; // `exp` is usually in seconds
    const currentTime = Date.now();

    // Check if the current time is before the expiration time
    return currentTime < expirationTime;
  } catch (err) {
    console.error("Invalid token", err);
    return false; // Token is invalid
  }
};