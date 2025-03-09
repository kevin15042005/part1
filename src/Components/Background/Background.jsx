import "./Background.css";
import image from "../../assets/moto1.jpg";
import image2 from "../../assets/positivismo.jpg";
import video from "../../assets/video1.mp4";

const Background = ({ playStatus, heroCont }) => {
  console.log(heroCont);
  console.log(playStatus);
  if (playStatus) {
    return (
      <div className="videoPricipal">
        <video className="background" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  } else if (heroCont === 1) {
    return <img src={image} className="background" alt="Imagen1" />;
  } else if (heroCont === 2) {
    return <img src={image2} className="background" alt="Imagen2" />;
  } else {
    return null;
  }
};

export default Background;
