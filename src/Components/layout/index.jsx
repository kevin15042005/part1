import React, { useState } from 'react'

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';
import Background from "../Background/Background";

const Layout = ({ children }) => {
  const [count, setCount] = useState(0);
  let heroData = [
    {
      text1: "Dive into",
      text2: "What is love",
    },
    {
      text1: "Indulve",
      text2: "your passion",
    },
    {
      text1: "Given",
      text2: "you passion",
    },
  ];
  const [heroCont, setheroCont] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);
  return (
    <div className="Main">
      <Background playStatus={playStatus} heroCont={heroCont} />

      <Navbar />
      {
        children
      }
      <Footer />
    </div>
  );
};

export default Layout