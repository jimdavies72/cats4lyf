import "./banner.css";

const Banner = (props) => {
  return (
    <div className="msg-container">
      <h3 id="message">{props.bannerText}</h3>
    </div>
  );
};

export default Banner;
