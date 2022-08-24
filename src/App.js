import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { AuthProvider } from './Contexts/AuthContext';
import { PostProvider } from './Contexts/PostContext';
function App() {
  return (
    <AuthProvider>
      <PostProvider>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/viewpost' element={<ViewPost />}></Route>

      </Routes>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
