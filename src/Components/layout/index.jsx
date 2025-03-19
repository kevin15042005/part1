import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  
  return (
    <div className="Main">

      <Navbar />
      {
        children
      }
    </div>
  );
};

export default Layout