import Cat from "../cat/Cat";
import AddRemControls from "../addRemControls/AddRemControls";

const ProductCard = (props) => {
  return (
    <div className="card-container">
      <Cat
        parent={props.parent}
        url={props.url}
        price={props.price}
        breed={props.breed}
        productName={props.productName}
        productDescription={props.productDescription}
      />
      <AddRemControls
        parent={props.parent}
        addMe={props.addMe}
        removeMe={props.removeMe}
      />
    </div>
  );
};

export default ProductCard;
