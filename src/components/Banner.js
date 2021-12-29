const Banner = (props) => {
  return (
    <div className="msg-container">
      <h2 id="message">{props.bannerText}</h2>
    </div>
  );
};

export default Banner;
