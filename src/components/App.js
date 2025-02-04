import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/style.css';
import Header from './Header';
import Home from './Home';
import Article from './Article';
import Signin from './Signin';
import Signup from './Signup';
import NotFound from './NotFound';
import { localstorageKey, userVerifyURL } from '../utils/constants';
import FullLoader from './FullLoader';

function App() {
  const [loggedInUser, setLoggedinUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(localstorageKey);

    if (!token) {
      setIsLoggedIn(false);
      setVerifying(false);
      return;
    }

    fetch(userVerifyURL, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Invalid Token: ${res.statusText}`);
        }
        return res.json();
      })
      .then((user) => {
        console.log('Frontend - Verified User : ', user);
        setIsLoggedIn(true);
        setVerifying(false);
      })
      .catch((err) => {
        console.error('token verification failed', err);
        localStorage.removeItem(localstorageKey);
        setIsLoggedIn(false);
        setVerifying(false);
      });
  }, []);

  let authUser = (user) => {
    setIsLoggedIn((prev) => !prev);
    setVerifying(false);
    localStorage.setItem(localstorageKey, user.token);
  };

  if (verifying) {
    return <FullLoader />;
  }
  return (
    <BrowserRouter>
      <Header user={isLoggedIn} />

      {isLoggedIn ? (
        <Authenticated />
      ) : (
        <NotAuthenticated updateUser={setLoggedinUser} authUser={authUser} />
      )}
    </BrowserRouter>
  );
}

function Authenticated() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:tag" element={<Home />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
function NotAuthenticated(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Signin updateUser={props.updateUser} authUser={props.authUser} />
        }
      />
      <Route
        path="/signup"
        element={
          <Signup updateUser={props.updateUser} authUser={props.authUser} />
        }
      />
      <Route path="/:tag" element={<Home />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
