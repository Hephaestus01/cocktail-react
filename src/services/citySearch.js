export const citySearch = async (query) => {
  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=matthewh478`
    );
    const data = await response.json();
    console.log(data);
    const cities = await data.geonames
      .map((city) => {
        if ((city.fc1Name = "city, village,...")) {
          return {
            city: city.name,
            state: city.adminName1,
            country: city.countryName,
            population: city.population,
          };
        } else return null;
      })
      .filter((city) => !(city && (city.city.match(/-/g) || []).length >= 2))
      .filter(
        (state) => !(state && (state.state.match(/-/g) || []).length >= 2)
      )
      .sort((a, b) => b.population - a.population);
    return cities;
  } catch (error) {
    console.group("Error fetching city data: ", error);
    return [];
  }
};
