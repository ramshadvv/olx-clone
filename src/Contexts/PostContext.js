import React, { useState,createContext } from 'react';


export const PostContext=createContext();
export function PostProvider({children}) {
    const [postDetails,setPostDetails]=useState({});
    
  return (
      <PostContext.Provider value={{
          postDetails,
          setPostDetails
      }}>
    {children}
    </PostContext.Provider>
  )
};

