

export function getCocktailImage(name) {
    var loadedCocktail = name
    console.log(loadedCocktail)
    var apiUrl = `https://bing-image-search1.p.rapidapi.com/images/search?q=cocktail%20%2B%20recipe%20%2B%20%22${loadedCocktail}&count=2&mkt=en-US`

    fetch(apiUrl, {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_BING_IMAGE_API,
            'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
        },
        contentType: 'application/json'
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (!data) {
                        getCocktailImage(name)
                    } else {
                        var imageReplace = document.getElementById("cocktail-image");
                        imageReplace.src = data.value[0].contentUrl;
                        savedCocktailURL = data.value[0].contentUrl;
                        localStorage.setItem("cocktailUrl", JSON.stringify(savedCocktailURL))
                    }
                })
            } else { getCocktailImage(name) }
        })
};


//function to request list of drinks with the magicWord() in its ingredients
export async function drinkFinder(liquorPrefs) {

    var getCocktailData = async function (ingredName) {
        console.log(`choices: ${liquorPrefs}`)
        if (!liquorPrefs) {
            var ingredName = magicWord()
        } else {
            let choices = liquorPrefs[Math.floor(Math.random() * choices.length)]
            var ingredName = magicWord()
        }

        return Promise.all(ingredName.map(async (name) => {
            if (!choices) {
                var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${name}`

            } else {
                var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${name},%20${choices}`

            }
            console.log(apiUrl)
            const result = await fetch(apiUrl, {
                method: "GET",
                headers: { 'X-Api-Key': process.env.REACT_APP_COCKTAIL_API },
                contentType: 'application/json'
            }).then(response => response.json());
            return result;
        }))
    };

    //function to get one random drink from the superArray and append the cocktail name
    function getIndex(superArray) {
        var randoArray = superArray[Math.floor(Math.random() * superArray.length)];
        var index = randoArray[Math.floor(Math.random() * randoArray.length)]
        console.log("SA: ", superArray)
        console.log("RA: ", randoArray)
        console.log("index: ", index)

        //saving cocktail info to local storage
        savedCocktail = index.name;
        savedIngred = index.ingredients;
        savedInstructions = index.instructions;
        cocktailInfo = [savedCocktail, savedIngred, savedInstructions]
        localStorage.setItem("cocktail", JSON.stringify(cocktailInfo))

        document.getElementById("cocktail-name").textContent = index.name.toUpperCase();
        cocktailNameEl = index.name.toUpperCase();
        // getCocktailImage(cocktailNameEl);
    }
    const cocktails = await getCocktailData();
    getIndex(cocktails);
};

//function to change the word that we search the json data with determined by temp
function magicWord() {
    if (loadedTemp > 80) {
        hotWeatherSearch = ["ice", "chilled", "cold"]
        return hotWeatherSearch
    }

    if (loadedTemp <= 80 && loadedTemp >= 60) {
        midWeatherSearch = ["garnish", "glass", "shake", "blend"]
        return midWeatherSearch
    }

    if (loadedTemp < 60) {
        coldWeatherSearch = [" hot", " warm"]
        return coldWeatherSearch
    }
};

function appendCocktailName() {
    document.getElementById("cocktail-name").textContent = index.name
}
