export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const saveLogIn = (token: string) => {
  localStorage.setItem("token", token);
};
export const logOut = () => {
  localStorage.removeItem("token");
};
export const getToken = () => {
  return localStorage.getItem("token");
};
