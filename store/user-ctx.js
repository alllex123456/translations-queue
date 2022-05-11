import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
  language: '',
});

export const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    fetch('/api/user/get-user')
      .then((res) => res.json())
      .then((data) => setUserInfo(data.message));
  }, []);

  const initialValues = {
    language: userInfo?.language,
  };

  return (
    <UserContext.Provider value={initialValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
