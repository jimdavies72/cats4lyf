import "./mainNav.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";

const MainNav = (props) => {
  useEffect(() => {
    breedsFetch();
  }, []);

  const breedsFetch = async () => {
    // creating a lookup table of breed id and name
    const fetchString = "https://api.thecatapi.com/v1/breeds";

    const response = await fetch(fetchString);
    const data = await response.json();

    // had a situation where on save would not clear out existing data and caused dupes which in turn caused console errors.
    if (props.breeds.length <= 1) {
      let tempObject = {};
      let tempArray = [...props.breeds];
      for (let i = 0; i < data.length; i++) {
        tempObject = {
          id: data[i].id,
          name: data[i].name,
        };
        tempArray.push(tempObject);
      }
      props.setBreedsHandler(tempArray);
    }
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
            onChange={(e) => props.selectBreedHandler(e)}
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
          <span id="eyeglass">
            <i
              onClick={() => props.breedListHandler()}
              className="fas fa-search"
            ></i>
          </span>
        </div>
        <div className="nav-links">
          <Link to="/">
            <span>
              <i
                onClick={() => props.bannerHandler("home")}
                className="fas fa-home"
              ></i>
            </span>
          </Link>
          <Link to="/cart">
            <span>
              <i
                onClick={() => props.bannerHandler("cart")}
                className="fas fa-shopping-cart"
              ></i>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainNav;
