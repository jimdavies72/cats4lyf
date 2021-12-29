import ProductCard from "./ProductCard";

const Products = (props) => {
  const addToBasketHandler = (cat, index) => {
    // add to basket
    props.setBasketData([...props.basketData, cat]);
    //remove from catData
    let temp = [...props.catData];
    temp.splice(index, 1);
    props.setCatData([...temp]);
  };

  return (
    <div className="product-container">
      {props.catData.length > 0 &&
        props.catData.map((cat, index) => {
          return (
            <div key={index}>
              <ProductCard
                parent={"products"}
                url={cat.url}
                price={cat.price}
                breed={cat.breed}
                productName={cat.productName}
                productDescription={cat.productDescription}
                addMe={() => addToBasketHandler(cat, index)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Products;
