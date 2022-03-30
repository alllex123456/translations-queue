import { createContext, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const loginHandler = () => {
    setLoggedIn(true);
  };
  const logoutHandler = () => {
    setLoggedIn(false);
  };

  const initialValues = {
    isLoggedIn: loggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={initialValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
