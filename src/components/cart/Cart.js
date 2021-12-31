import "./cart.css";

import ProductCard from "../productCard/ProductCard";
import OrderPanel from "../orderPanel/OrderPanel";

const Cart = (props) => {
  const removeFromBasketHandler = (index, cat) => {
    // remove from Basket
    let temp = [...props.basketData];
    temp.splice(index, 1);
    props.setBasketData([...temp]);
    // add back to catData
    props.setCatData([...props.catData, cat]);
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {props.basketData.length > 0 &&
          props.basketData.map((cat, index) => {
            return (
              <div key={index}>
                <ProductCard
                  parent={"cart"}
                  url={cat.url}
                  price={cat.price}
                  breed={cat.breed}
                  productName={cat.productName}
                  productDescription={cat.productDescription}
                  removeMe={() => removeFromBasketHandler(index, cat)}
                />
              </div>
            );
          })}
      </div>
      <div className="order-panel">
        <OrderPanel basketData={props.basketData} />
      </div>
    </div>
  );
};

export default Cart;
