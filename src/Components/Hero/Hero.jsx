import "./Hero.css";
import arrow_btn from "../../assets/button.svg";
import pause_btn from "../../assets/pause.svg";

const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  setPlayStatus,
  playStatus,
}) => {
  return (
    <div className="hero">
      <div className="hero-text"></div>
      <p>{heroData.text1}</p>
      <p>{heroData.text2}</p>

      <div className="hero-explore">
        <p>Explore the features</p>
        <img src={arrow_btn} alt="Boton" />
      </div>
      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
