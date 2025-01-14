import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Set the Bearer Token
export const storeToken = (token) => {
  cookies.set('bearerToken', token, {
    path: '/',
  });
};

// Get the Bearer Token
export const getToken = () => {
  return cookies.get('bearerToken') || null;
};

// Delete the Bearer Token
export const deleteToken = () => {
  cookies.remove('bearerToken', { path: '/' });
};
