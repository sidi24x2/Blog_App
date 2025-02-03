import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/style.css';
import Header from './Header';
import Home from './Home';
import Article from './Article';
import Signin from './Signin';
import Signup from './Signup';
import NotFound from './NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:tag" element={<Home />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
