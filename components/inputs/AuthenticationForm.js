import classes from './AuthenticationForm.module.css';

import { useState, useRef } from 'react';
import { signIn, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const AuthenticationForm = (props) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const checkPasswordInputRef = useRef();

  const toggleLogin = () => {
    setIsLogin((previous) => !previous);
  };

  async function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enterePassword = passwordInputRef.current.value;

    if (isLogin) {
      setLoading(true);
      const response = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enterePassword,
      });
      setLoading(false);
      if (!response.error) router.replace('/profile');
      if (response.error) alert(response.error);
    } else {
      setLoading(true);
      const enteredCheckPassword = checkPasswordInputRef.current.value;
      fetch('api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enterePassword,
          checkPassword: enteredCheckPassword,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLogin(true);
          setLoading(false);
          setSignedUp(data.message);
        });
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailInputRef} />
      </div>
      <div className={classes.controls}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordInputRef} />
      </div>
      {!isLogin && (
        <div className={classes.controls}>
          <label htmlFor="checkpassword">Re-enter password:</label>
          <input
            type="password"
            id="checkpassword"
            ref={checkPasswordInputRef}
          />
        </div>
      )}
      <button className={classes.action}>
        {isLogin ? 'Log in' : 'Sign up'}
      </button>
      <button type="button" className={classes.toggle} onClick={toggleLogin}>
        {isLogin ? 'or create new account' : 'or sign in with existing account'}
      </button>
      {loading && <p className={classes.loading}>Please wait...</p>}
      <p className={classes.loading}>{signedUp}</p>
    </form>
  );
};

export default AuthenticationForm;
