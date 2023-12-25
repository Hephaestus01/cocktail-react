//function to request list of drinks with the magicWord() in its ingredients
export async function drinkFinder(liquorPrefs, weather) {
  var getCocktailData = async function () {
    console.log(`choices: ${liquorPrefs}`);
    let choices = liquorPrefs
      ? liquorPrefs[Math.floor(Math.random() * liquorPrefs.length)]
      : null;
    let ingredName = magicWord(weather[0]);

    return Promise.all(
      ingredName.map(async (name) => {
        if (!choices) {
          var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${name}`;
        } else {
          var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${name},%20${choices}`;
        }
        console.log(apiUrl);
        const result = await fetch(apiUrl, {
          method: "GET",
          headers: { "X-Api-Key": process.env.REACT_APP_COCKTAIL_API },
          contentType: "application/json",
        }).then((response) => response.json());
        return result;
      })
    );
  };

  //function to get one random drink from the superArray and append the cocktail name
  async function getIndex(superArray) {
    let filteredSuperArray = superArray.filter(
      (subArray) => subArray.length > 0
    );
    let randoArray =
      filteredSuperArray[Math.floor(Math.random() * filteredSuperArray.length)];
    let index;
    if (randoArray.length > 0) {
      index = randoArray[Math.floor(Math.random() * randoArray.length)];
    } else {
      index = randoArray[0];
    }
    console.log("SA: ", superArray);
    console.log("RA: ", randoArray);
    console.log("index: ", index);

    //saving cocktail info to local storage
    let savedCocktail = index.name;
    let savedIngred = index.ingredients;
    let savedInstructions = index.instructions;
    let cocktailInfo = [savedCocktail, savedIngred, savedInstructions];
    localStorage.setItem("cocktail", JSON.stringify(cocktailInfo));

    let cocktailNameEl = index.name.toUpperCase();
    let imageURL = await getCocktailImage(cocktailNameEl);
    return [cocktailInfo, imageURL];
  }
  const cocktails = await getCocktailData();
  return getIndex(cocktails);
}

//function to change the word that we search the json data with determined by temp
function magicWord(loadedTemp) {
  if (loadedTemp > 80) {
    const hotWeatherSearch = ["ice", "chilled", "cold"];
    return hotWeatherSearch;
  }

  if (loadedTemp <= 80 && loadedTemp >= 60) {
    const midWeatherSearch = ["garnish", "glass", "shake", "blend"];
    return midWeatherSearch;
  }

  if (loadedTemp < 60) {
    const coldWeatherSearch = [" hot", " warm"];
    return coldWeatherSearch;
  }
  // default return value
  return ["default"];
}

export async function getCocktailImage(name) {
  var loadedCocktail = name;
  console.log("loadedCocktail: ", loadedCocktail);

  const query = `"${loadedCocktail} cocktail" "close-up" "high resolution" imagesize:large`;
  const encodedQuery = encodeURIComponent(query);

  // const url = "https://google-api31.p.rapidapi.com/imagesearch";
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //     "X-RapidAPI-Key": "7df2415608mshf6be38a9814c3b3p14bd14jsncc475252c4dd",
  //     "X-RapidAPI-Host": "google-api31.p.rapidapi.com",
  //   },
  //   body: {
  //     text: "margarita cocktail",
  //     safesearch: "off",
  //     region: "wt-wt",
  //     color: "",
  //     size: "",
  //     type_image: "",
  //     layout: "",
  //     max_results: 100,
  //   },
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.text();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }

  const url = `https://google-search83.p.rapidapi.com/google/search_image?query=${encodedQuery}&gl=us&lr=en&num=10&start=0&sort=relevance`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_GOOGLE_IMAGE_API,
      "X-RapidAPI-Host": "google-search83.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`data: ${data}`);
    let imageURL = data[0].url;
    console.log("IMAGE SEARCH RESULT: ", imageURL);
    return imageURL;
  } catch (error) {
    console.error(error);
  }
}
