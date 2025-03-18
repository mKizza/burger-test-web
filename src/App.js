// import "./bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import "./App.css";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const translations = {
  cro: {
    welcome: "Dobro došli",
    toOurPage: "na stranicu našeg burger-puba",
    aboutBurgerPub: "O nama",
    openingHours: "Radno vrijeme: ",
    closed: "Trenutno smo zatvoreni",
    open: "OTvoreno",
    food: "Hrana",
    drinks: "Piće",
    burgersMenu: "Ponuda burgera",
    beerMenu: "Ponuda pića",
    burgerName: "Ime Burgera",
    ingredients: "Sastojci",
    location: "Naša lokacija",
    locationAndDescription:
      "Posjetite nas na ovoj lokaciji koja je prikazana na mapi",
  },

  de: {
    welcome: "Willkommen",
    toOurPage: "auf unserer Burger-Grill-Seite",
    aboutBurgerPub: "Über Burger Pub",
    openingHours: "Arbeitszeit: ",
    closed: "Wir sind derzeit geschlossen",
    open: "Geöffnet",
    food: "Essen",
    drinks: "Getränke",
    burgersMenu: "Burger-Menü",
    beerMenu: "Bier-Menü",
    burgerName: "Burger Name",
    ingredients: "Zutaten",
    location: "Unser Standort",
    locationAndDescription: "Visit us on this location (see on the map",
  },
};

const burgerPubInfo = [
  {
    name: "Burger Pub",
    city: "Munchen",
    adress: "Milbertshofener Str. 34",
    timeOpen: 8,
    timeClosed: 20,
  },
];

const burgerOffer = [
  {
    name: "Burger 1",
    id: 1,
    image: "/burger/burger-menu-picture.jpg",
    ingredients: "150 grama mesa, kukuruz, salata",
  },
  {
    name: "Burger 2",
    id: 2,
    image: "/burger/burger-menu-picture.jpg",
    ingredients: "150 grama mesa, paradajz, krastavac",
  },
  {
    name: "Burger 3",
    id: 3,
    image: "/burger/burger-menu-picture.jpg",
    ingredients: "130 grama mesa, paradajz, luk",
  },
  {
    name: "Burger 1",
    id: 1,
    image: "/burger/burger-menu-picture.jpg",
    ingredients: "150 grama mesa, kukuruz, salata",
  },
  {
    name: "Burger 2",
    id: 2,
    image: "/burger/burger-menu-picture.jpg",
    ingredients: "150 grama mesa, paradajz, krastavac",
  },
  {
    name: "Burger 3",
    id: 3,
    image: "/burger/burger-menu-picture.jpg",
    ingredients: "130 grama mesa, paradajz, luk",
  },
];

const beerOffer = [
  {
    name: "Beer 1",
    id: 1,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 2",
    id: 2,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 3",
    id: 3,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 1",
    id: 1,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 2",
    id: 2,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 3",
    id: 3,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 1",
    id: 1,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 2",
    id: 2,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
  {
    name: "Beer 3",
    id: 3,
    image: "/beer/beer.jpg",
    ingredients: "0.33l, 0,5l, 1l",
  },
];

const useTranslation = (language = "cro") => {
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const translate = (key, params = {}) => {
    let translation = translations[currentLanguage][key];

    // Replace placeholders with actual values (e.g., opening hours)
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{${param}}`, params[param]);
    });

    return translation;
  };

  return { translate, setCurrentLanguage };
};

// const offer = burgerOffer;

function App() {
  const [burgerPub, setbBurgerPub] = useState(burgerPubInfo);
  const { translate, setCurrentLanguage } = useTranslation("cro");

  const switchLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="App" id="App">
      <header className="App-header">
        <MainMenuTrack translate={translate} switchLanguage={switchLanguage} />
        <div className="background-and-icon-down">
          <Background translate={translate} />

          <IconDown translate={translate} />
        </div>
        <AboutBurgerPub burgerPub={burgerPub} translate={translate} />

        <FoodMenu translate={translate} />
        <MyLocationOnTheMap translate={translate} />
        <Footer />
      </header>
    </div>
  );
}

function MainMenuTrack({ translate, switchLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="align">
      <div className="logo">
        <img
          src="/logo/burger-pub-logo2.png"
          alt="Burger Pub Logo"
          className="logo-image"
          onClick={() =>
            document
              .getElementById("App")
              .scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>
      <div className="main-menu-track">
        <div className="hamburger" onClick={toggleMenu}>
          <span
            dangerouslySetInnerHTML={{
              __html: isMenuOpen ? "&#10005;" : "&#9776;",
            }}
          />
        </div>
        <div
          className={`main-menu-options ${isMenuOpen ? "active" : ""}`}
          id="menu"
        >
          <h5
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            {translate("aboutBurgerPub")}
          </h5>
          <h5 className="daily-menu">{translate("food")}</h5>
          <h5
            className="h-five-burgers-menu"
            onClick={() =>
              document
                .getElementById("all-offer")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            {translate("burgersMenu")}
          </h5>
          <h5
            onClick={() =>
              document
                .getElementById("our-location")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            {translate("location")}
          </h5>
        </div>
        <div className="language-switcher">
          <button onClick={() => switchLanguage("cro")} className="button-30">
            Cro
          </button>
          <button onClick={() => switchLanguage("de")} className="button-30">
            Ger
          </button>
        </div>
      </div>
    </div>
  );
}

function Background({ translate }) {
  // const { translate } = useTranslation("cro");
  return (
    <div className="welcome">
      <img
        // src="/burger/Novi-burger.jpg"
        src="/burger/Novi-burger.jpg"
        alt="burger background"
        className="burger-background"
      />
      <img
        src="/burger/Novi-burger-small.jpg"
        alt="burger background"
        className="burger-background-small"
      />
      <div className="headers">
        <h1 className="left dobro-dosli">{translate("welcome")}</h1>
        <h2 className="right na-stranicu">{translate("toOurPage")}</h2>
      </div>
    </div>
  );
}

function IconDown({ translate }) {
  // State to track if the user has scrolled

  return (
    <div className="span-div">
      <div className="icon-down-background">
        <img src="/icon-down-background/down-picture.png" alt="icon-down" />
      </div>
      <h1
        className="span"
        onClick={() =>
          document
            .getElementById("about")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        {translate("welcome")}
      </h1>
    </div>
  );
}

function AboutBurgerPub({ burgerPub, translate }) {
  const [time, setTime] = useState(new Date().getHours());
  // const { translate } = useTranslation("de"); // Get current hour in 24-hour format

  // Update the time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, []);

  const pub = burgerPub[0]; // Access the first item in the array

  const isOpen = time >= pub.timeOpen && time < pub.timeClosed; // Check if it's within the open hours

  return (
    <div className="about-burger-pub" id="about">
      <div className="burger-logo-and-text">
        <img
          src="/burger-pub-logo/burger.jpeg"
          alt="slika"
          className="about-and-menu-image"
        />
        <img
          src="/burger-pub-logo/some-food.jpeg"
          alt="slika"
          className="about-and-menu-image-middle-and-large"
        />

        <div className="about-pub">
          <p className="about">
            {translate("welcome")} {translate("toOurPage")}{" "}
            <span className="na-stranicu">{pub.name}</span>{" "}
          </p>
          <p className="about">
            {translate("openingHours")}: {pub.timeOpen} -{pub.timeClosed}
          </p>

          <p>{isOpen ? "Otvoreno" : "Trenutno smo zatvoreno"}</p>
        </div>
      </div>
    </div>
  );
}

function FoodMenu({ translate }) {
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [isDrinkMenuOpen, setIsDrinkMenuOpen] = useState(false);

  // Toggle the food menu
  const toggleFoodMenu = () => {
    setIsFoodMenuOpen(!isFoodMenuOpen);
    setIsDrinkMenuOpen(false); // Close drink menu if it's open
  };
  const toggleDrinksMenu = () => {
    setIsDrinkMenuOpen(!isDrinkMenuOpen);
    setIsFoodMenuOpen(false); // Close drink menu if it's open
  };

  return (
    <div className="menu">
      <div id="all-offer" className="all-offer">
        <button
          className={`button ${isFoodMenuOpen ? "open" : ""}`}
          onClick={toggleFoodMenu}
        >
          {translate("food")}
        </button>
        {isFoodMenuOpen && <BurgersMenu />}
        <button
          className={`button ${isDrinkMenuOpen ? "open" : ""}`}
          onClick={toggleDrinksMenu}
        >
          {translate("drinks")}
        </button>
        {isDrinkMenuOpen && <BeerMenu />}
      </div>
    </div>
  );
}

function BurgersMenu() {
  const [burgers, setBurgers] = useState(burgerOffer);

  return (
    <ul className="burger-list">
      {burgers?.map((burger) => (
        <Burger burger={burger} key={burger.id} name={burger.name} />
      ))}
    </ul>
  );
}

function Burger({ burger }) {
  return (
    <li className="burger-item">
      <div className="burger-image-container">
        <img src={burger.image} alt={burger.name} className="burger-image" />
        <div className="ingredients">
          <h2 className="burger-name">{burger.name}</h2>
          <p className="p">{burger.ingredients}</p>
        </div>
      </div>
    </li>
  );
}
function BeerMenu() {
  const [beers, setBeers] = useState(beerOffer);
  return (
    <ul className="beer-list">
      {beers?.map((beer) => (
        <Beer beer={beer} key={beer.id} name={beer.name} />
      ))}
    </ul>
  );
}

function Beer({ beer }) {
  return (
    <li className="beer-item">
      <div className="beer-image-container">
        <img src={beer.image} alt={beer.id} className="beer-image" />
        <div className="ingredients">
          <h2 className="burger-name">{beer.name}</h2>
          <p className="p">{beer.ingredients}</p>
        </div>
      </div>
    </li>
  );
}

function MyLocationOnTheMap({ translate }) {
  return (
    <div className="google-map">
      <iframe
        className="our-location"
        id="our-location"
        width="100%"
        height="400"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Milbertshofener%20str%2034+(My%20Business%20NameBurger%20Pub%20Munchen)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        title="Map showing the location of Milbertshofener Str 34, My Business Name Burger Pub in Munich"
      ></iframe>
    </div>
  );
}

function Footer() {
  return (
    // <div className="footer">
    //   <h3>Burger-pub Munchen</h3>
    //   <p>e-mail: burger-pub-munchen@gmail.com</p>
    //   <p>contact: +387123456789</p>
    //   <p>web: www.burgerpubmunchen.de</p>
    // </div>

    // bootstrap footer

    <footer class="bg-body-tertiary text-center footer" className="footer">
      <div class="container p-4">
        <div class="row">
          <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 class="text-uppercase">Footer Content</h5>
            <p>
              Test Test Test Test Test Test Test Test Test Test Test Test Test
              Test Test Test Test Test Test Test Test Test Test{" "}
            </p>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Links</h5>

            <ul class="list-unstyled mb-0">
              <li>
                <a href="#!" class="text-body">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" class="text-body">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" class="text-body">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" class="text-body">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase mb-0">Links</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#!" class="text-body">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" class="text-body">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" class="text-body">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" class="text-body">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    // bootstrap footer
  );
}
export default App;
