import React, { useState, useRef, useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./Home.css";
import MainLogo from "./components/MainLogo";
import LiquorPrefs from "./components/LiquorPrefs";
import CitySearch from "./components/CitySearch";
import Recommendation from "./Recommendation";

export default function Home({
  modalState,
  setModalState,
  citySelected,
  setCitySelected,
  weather,
  setWeather,
  cocktail,
  setCocktail,
}) {
  // const [modalState, setModalState] = useState("citySearch");
  const [query, setQuery] = useState("");
  const mainLogoRef = useRef(null);
  const cityRef = useRef(null);
  const liquorRef = useRef(null);
  const recommendationRef = useRef(null);
  let nodeRef = useRef(null);

  if (modalState === "mainLogo") {
    nodeRef = mainLogoRef;
  } else if (modalState === "citySearch") {
    nodeRef = cityRef;
  } else if (modalState === "liquorPrefs") {
    nodeRef = liquorRef;
  } else if (modalState === "recommendation") {
    nodeRef = recommendationRef;
  } else {
    console.log("error: modalState doesn't match");
  }

  const componentMap = {
    mainLogo: <MainLogo setModalState={setModalState} />,
    citySearch: (
      <CitySearch
        query={query}
        setQuery={setQuery}
        citySelected={citySelected}
        setCitySelected={setCitySelected}
        setWeather={setWeather}
        setModalState={setModalState}
        setCocktail={setCocktail}
      />
    ),
    liquorPrefs: (
      <LiquorPrefs
        setModalState={setModalState}
        cocktail={cocktail}
        setCocktail={setCocktail}
        weather={weather}
      />
    ),
    recommendation: (
      <Recommendation
        query={query}
        weather={weather}
        cocktail={cocktail}
        setModalState={setModalState}
      />
    ),
  };

  return (
    <>
      <div className="font-poppins w-full flex flex-col">
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={modalState} // Use the state to generate a unique key
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div ref={nodeRef} className="flex justify-center h-full bg-slate-800">
              {componentMap[modalState]}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}
