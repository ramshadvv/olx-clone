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
          <Route path='/olx-clone' element={<Home />}></Route>
          <Route path='/olx-clone/login' element={<Login />}></Route>
          <Route path='/olx-clone/signup' element={<Signup />}></Route>
          <Route path='/olx-clone/create' element={<Create />}></Route>
          <Route path='/olx-clone/viewpost' element={<ViewPost />}></Route>

      </Routes>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
