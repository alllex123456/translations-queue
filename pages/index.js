import { useEffect, useState } from 'react';
import AuthenticationForm from '../components/AuthenticationForm';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

const HomePage = () => {
  return <AuthenticationForm />;
};

export default HomePage;
