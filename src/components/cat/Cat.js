const Cat = (props) => {
  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  const price = formatter.format(props.price);

  return (
    <div className="cat-container">
      <div className="cat-img">
        <img src={props.url} alt="Cat" />
      </div>
      <div className="cat-text">
        <div className="price-n-prod">
          <h3>{price}</h3>
          <h4>Name: {props.productName}</h4>
          <h4>Breed: {props.breed}</h4>
        </div>
        <p>{props.productDescription}</p>
      </div>
    </div>
  );
};

export default Cat;
