import "./Cats4Lyf.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainNav from "./components/MainNav.js";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

//import FadeLoader from "react-spinners/FadeLoader";
import faker from "faker";
import catNames from "cat-names";

const Cats4Lyf = () => {
  const [catData, setCatData] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [bannerText, setBannerText] = useState(
    "Currently Trending Products..."
  );
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [breeds, setBreeds] = useState([
    {
      id: "all",
      name: "All",
    },
  ]);

  const numProducts = 21;

  useEffect(() => {
    breedsFetch();
    handleFetch(numProducts, selectedBreed);
  }, []);

  const breedsFetch = async () => {
    //creating a lookup table of breed id and name
    const fetchString = "https://api.thecatapi.com/v1/breeds";

    const response = await fetch(fetchString);
    const data = await response.json();

    // had a situation where on save would not clear out existing data and caused dupes which in turn caused console errors.
    if (breeds.length <= 1) {
      let tempObject = {};
      let tempArray = [...breeds];
      for (let i = 0; i < data.length; i++) {
        tempObject = {
          id: data[i].id,
          name: data[i].name,
        };
        tempArray.push(tempObject);
      }
      setBreeds([...tempArray]);
    }
  };

  const handleFetch = async (numProducts, breedValue) => {
    let fetchString = "";
    if (breedValue === "all" || breedValue === "") {
      fetchString = `https://api.thecatapi.com/v1/images/search?limit=${numProducts}`;
    } else {
      fetchString = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedValue}&limit=${numProducts}`;
    }

    const response = await fetch(fetchString);
    const data = await response.json();

    // add in data from other apis to data object
    for (let i = 0; i < data.length; i++) {
      data[i].price = faker.commerce.price();
      if (breedValue === "all") {
        data[i].breed = faker.animal.cat();
      } else {
        const obj = breeds.find((obj) => obj.id === breedValue);
        data[i].breed = obj.name;
      }
      data[i].productName = catNames.random();
      data[i].productDescription = faker.commerce.productDescription();
    }
    setCatData(data);
  };

  const breedListHandler = () => {
    handleFetch(numProducts, selectedBreed);
  };

  //TODO: Add in waiting for data spinner
  //TODO: Make Banner Text dynamic between products and cart.

  return (
    <div className="app-container">
      <Router>
        <MainNav
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          blHandler={breedListHandler}
          breeds={breeds}
        />
        <Banner bannerText={bannerText} />
        <Switch>
          <Route exact path="/">
            <Products
              catData={catData}
              setCatData={setCatData}
              basketData={basketData}
              setBasketData={setBasketData}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              catData={catData}
              setCatData={setCatData}
              basketData={basketData}
              setBasketData={setBasketData}
            />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default Cats4Lyf;
