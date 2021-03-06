import "./Cats4Lyf.css";
import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";

import MainNav from "./components/mainNav/MainNav";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Banner from "./components/banner/Banner";

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

  const bannerTextArray = [
    {
      id: "default",
      text: "Please click Home or Cart... ",
    },
    {
      id: "load",
      text: "Currently Trending Products...",
    },
    {
      id: "home",
      text: "Products Catalogue...",
    },
    {
      id: "cart",
      text: "Your Shopping Cart...",
    },
    {
      id: "results",
      text: "Your search results...",
    },
    {
      id: "error",
      text: "An error has occured. try refreshing your browser or try again in a few mintues",
    },
  ];
  const numProducts = 21;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    handleFetch(numProducts, selectedBreed);
  }, []);

  const handleFetch = async (numProducts, breedValue) => {
    try {
      let fetchString = "";
      if (breedValue === "all" || breedValue === "") {
        fetchString = `https://api.thecatapi.com/v1/images/search?limit=${numProducts}`;
        bannerHandler("load");
      } else {
        fetchString = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedValue}&limit=${numProducts}`;
        bannerHandler("results");
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
    } catch {
      bannerHandler("error");
      setLoading(false);
    }
  };

  //this sets the state of selectedBreed for the search button click.
  const selectBreedHandler = (e) => {
    setSelectedBreed(e.target.value);
  };

  // return products based on breed selected in search box
  const breedListHandler = () => {
    handleFetch(numProducts, selectedBreed);
    // view home if clicked when in basket. ignore already home to stop console warning.
    location.pathname !== "/" && history.push("/");
    bannerHandler("home");
  };

  // populates the Breeds state for the drop down list
  const setBreedsHandler = (array) => {
    setBreeds([...array]);
  };

  // handle the text that appears in th text banner (below the nav)
  // TODO: this needs work to handle display order conflicts.
  const bannerHandler = (id) => {
    const obj = bannerTextArray.find((obj) => obj.id === id);
    setBannerText(obj.text);
  };

  const addToBasketHandler = (cat, index) => {
    // add to basket
    setBasketData([...basketData, cat]);
    //remove from Products (catData)
    let temp = [...catData];
    temp.splice(index, 1);
    setCatData([...temp]);
  };

  const removeFromBasketHandler = (index, cat) => {
    // remove from Basket
    let temp = [...basketData];
    temp.splice(index, 1);
    setBasketData([...temp]);
    // add back to catData
    setCatData([...catData, cat]);
  };

  // react spinner
  if (loading) {
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
        <MainNav
          breeds={breeds}
          setBreedsHandler={setBreedsHandler}
          selectBreedHandler={selectBreedHandler}
          breedListHandler={breedListHandler}
          bannerHandler={bannerHandler}
        />
        <Banner bannerText={bannerText} />
        <Switch>
          <Route exact path="/">
            <Products
              catData={catData}
              addToBasketHandler={addToBasketHandler}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              catData={catData}
              removeFromBasketHandler={removeFromBasketHandler}
              basketData={basketData}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
};

export default withRouter(Cats4Lyf);
