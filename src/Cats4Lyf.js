import "./Cats4Lyf.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainNav from "./components/MainNav.js";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

import FadeLoader from "react-spinners/FadeLoader";
import faker from "faker";
import catNames from "cat-names";

//Main Functional Component
const Cats4Lyf = () => {
  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [bannerText, setBannerText] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [breeds, setBreeds] = useState([
    {
      id: "all",
      name: "All",
    },
  ]);

  const numProducts = 21;

  useEffect(() => {
    setLoading(true);
    handleFetch(numProducts, selectedBreed);
  }, []);

  const handleFetch = async (numProducts, breedValue) => {
    let fetchString = "";
    if (breedValue === "all" || breedValue === "") {
      fetchString = `https://api.thecatapi.com/v1/images/search?limit=${numProducts}`;
      setBannerText("Currently Trending Products...");
    } else {
      fetchString = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedValue}&limit=${numProducts}`;
      setBannerText("Your search results...");
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
    setLoading(false);
  };

  const breedListHandler = () => {
    handleFetch(numProducts, selectedBreed);
  };

  const setBannerHandler = (location) => {
    let bannerText = "";
    console.log("setbanner click");
    if (location === "home") {
      bannerText = "Products Catalogue...";
    } else if (location === "cart") {
      bannerText = "Your Shopping Cart...";
    } else {
      bannerText = "Click Home or Cart ...";
    }

    setBannerText(bannerText);
  };

  if (loading) {
    // react spinner
    return (
      <div className="spinner">
        <FadeLoader loading={true} color={"#0c9726"} />
        <h3>Loading...</h3>
      </div>
    );
  } else {
    // render the data
    return (
      <div className="app-container">
        <Router>
          <MainNav
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            blHandler={breedListHandler}
            breeds={breeds}
            setBreeds={setBreeds}
            setBanner={setBannerHandler}
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
  }
};

export default Cats4Lyf;
