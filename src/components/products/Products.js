import "./products.css";

import ProductCard from "../productCard/ProductCard";

const Products = (props) => {
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
                addMe={() => props.addToBasketHandler(cat, index)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Products;
