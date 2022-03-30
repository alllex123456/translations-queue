import classes from './AuthenticationForm.module.css';

import { useState, useRef } from 'react';

const AuthenticationForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const checkPasswordInputRef = useRef();

  const toggleLogin = () => {
    setIsLogin((previous) => !previous);
  };

  function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enterePassword = passwordInputRef.current.value;

    if (isLogin) {
    } else {
      const enteredCheckPassword = checkPasswordInputRef.current.value;
      fetch('api/signup', {
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
    </form>
  );
};

export default AuthenticationForm;
