import { createContext } from 'react';

const UserContext = createContext({
  language: '',
});

export const UserContextProvider = (props) => {
  const initialValues = {
    language: 'ro',
  };
  return (
    <UserContext.Provider value={initialValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
