import "./addRemControls.css";

const AddRemControls = (props) => {
  return (
    <div className="addrem-container">
      {props.parent === "cart" ? (
        <button onClick={props.removeMe}>Remove from Basket</button>
      ) : (
        <button onClick={props.addMe}>Add to Basket</button>
      )}
    </div>
  );
};

export default AddRemControls;
