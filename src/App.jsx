import { useState } from "react";
import "./App.css";
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Pintura from "";
import Contacto from "";
import Nosotros from "";
import Login from "";

function App() {
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
  const [playStatus, setPlayStatus] = useState(true);
  return (
    <>
      <div>
        <Background playStatus={playStatus} heroCont={heroCont} />
        <Navbar />
        <Routes>
          <Route path="/Pintura" element={<Pintura/>} />
          <Route path="/Contacto" element={<Contacto/>} />
          <Route path="/Nostros" element={<Nosotros/>} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
        <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCont]}
          heroCont={heroCont}
          setheroCont={setheroCont}
          playStatus={playStatus}
        />
      </div>
    </>
  );
}

export default App;
