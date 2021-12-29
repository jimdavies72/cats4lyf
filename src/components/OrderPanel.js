const OrderPanel = ({ basketData }) => {
  let totalValue = 0;

  let itemDesc = "items";
  if (basketData.length === 1) {
    itemDesc = "item";
  }

  let basketMsg = "Your basket...";
  if (basketData.length === 0) {
    basketMsg = "You basket is empty...";
  }

  return (
    <>
      <h2 id="order-panel-heading">{basketMsg}</h2>
      {basketData.length > 0 &&
        basketData.map((cat, index) => {
          totalValue += parseInt(cat.price);
          return (
            <div key={index}>
              <h3>
                {cat.productName} : £{cat.price}
              </h3>
            </div>
          );
        })}
      <h3 id="order-panel-sub-total">
        Subtotal ({basketData.length} {itemDesc}): £{totalValue}
      </h3>
    </>
  );
};

export default OrderPanel;
