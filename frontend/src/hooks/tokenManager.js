import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

// Set the Bearer Token
export const storeToken = (token) => {
  const oneHourFromNow = new Date(
    new Date().getTime() + 60 * 60 * 1000,
  );

  console.info(oneHourFromNow)
  cookies.set("bearerToken", token, {
    path: "/",
    expires: oneHourFromNow,
  });
};

// Get the Bearer Token
export const getToken = () => {
  return cookies.get("bearerToken") || null;
};

// Delete the Bearer Token
export const deleteToken = () => {
  cookies.remove("bearerToken", { path: "/" });
};

export const isTokenValid = () => {
  const cookies = new Cookies();
  const token = cookies.get("bearerToken");

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