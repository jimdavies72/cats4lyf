// React Router version 5...
import { Link } from "react-router-dom";

const MainNav = (props) => {
  const selectBreed = (e) => {
    props.setSelectedBreed(e.target.value);
  };

  return (
    <>
      <div className="nav-bar">
        <Link to="/">
          <h1 className="logo">cats-4-lyf.co.uk</h1>
        </Link>
        <div className="search-box">
          <select
            className="breed-select"
            id="breeds"
            name="breeds"
            onChange={selectBreed}
          >
            {props.breeds.length > 0 &&
              props.breeds.map((breed) => {
                return (
                  <option key={breed.id} value={breed.id}>
                    {breed.name}
                  </option>
                );
              })}
          </select>
          <button onClick={() => props.blHandler()}>Search</button>
        </div>
        <div className="nav-links">
          <Link to="/">
            <span>
              <i className="fas fa-home"></i>
            </span>
          </Link>
          <Link to="/cart">
            <span>
              <i className="fas fa-shopping-cart"></i>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainNav;
