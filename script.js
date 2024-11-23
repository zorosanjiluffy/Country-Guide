let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value.trim(); // Use the input value
    if (!countryName) {
        alert("Please enter a country name");
        return;
    }

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);

    fetch(finalURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then((data) => {
            let country = data[0];
            let flag = country.flags.svg;
            let name = country.name.common;
            let capital = country.capital ? country.capital[0] : "N/A";
            let continent = country.continents[0];
            let currencyCode = Object.keys(country.currencies)[0];
            let currencyName = country.currencies[currencyCode].name;
            let languages = Object.values(country.languages).join(", ");
            let population = country.population.toLocaleString(); // Format the population with commas

            document.getElementById("result").innerHTML = `
                <img src="${flag}" class="flag-img" alt="Flag of ${name}">
                <h2>${name}</h2>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Capital:</h4> <span>${capital}</span>
                    </div>
                    <div class="data-wrapper">
                        <h4>Continent:</h4> <span>${continent}</span>
                    </div>
                    <div class="data-wrapper">
                        <h4>Population:</h4> <span>${population}</span>
                    </div>
                    <div class="data-wrapper">
                        <h4>Currency:</h4> <span>${currencyName} (${currencyCode})</span>
                    </div>
                    <div class="data-wrapper">
                        <h4>Languages:</h4> <span>${languages}</span>
                    </div>
                </div>`;
        })
        .catch((error) => {
            if (countryName.length == 0) {
                result.innerHTML = `<h3> The input field cannot be empty</h3>`;

            }
            else {
                result.innerHTML = `<h3> Please enter a valid country name.</h3>`;

            }
        });
});
