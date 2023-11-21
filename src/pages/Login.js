import React from 'react';
import { auth, provider } from '../firebase-config';
// import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const signInwithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('IsAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };
  return (
    <div className="loginPage">
      <h2
        style={{
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        Welcome to Create-Post <span>Muavia Haidri</span>
      </h2>
      <button className="login-with-google-btn" onClick={signInwithGoogle}>
        Sign in With Google
      </button>
    </div>
  );
}

export default Login;
