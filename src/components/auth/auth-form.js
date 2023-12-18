import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from './auth-form.module.css';

async function sendData(data) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [error, setError] = useState('');

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enterEmail = emailRef.current.value;
    const enterPassword = passwordRef.current.value;

    console.log('data', enterEmail, enterPassword)

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enterEmail,
        password: enterPassword,
      });

      console.log('result', result);

      if (!result.error) {
        // set some auth state
        router.replace('/profile');
      }
    } else {
      try {
        await sendData({
          email: enterEmail,
          password: enterPassword,
        });
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>

          <p>{error}</p>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
