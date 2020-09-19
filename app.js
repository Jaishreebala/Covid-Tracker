const table = document.querySelector("#country-list");
async function getDataFromAPI() {
    const fetchData = await fetch("https://api.covid19api.com/summary", {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    const data = await fetchData.json();
    console.log(data.Countries);
    data.Countries.forEach(country => {
        console.log(country)
        let tableRow = document.createElement("tr");
        // for(var i = 0 ; i<7; i++){
        let countryName = document.createElement("td");
        let newConfirmed = document.createElement("td");
        let newDeaths = document.createElement("td");
        let newRecovered = document.createElement("td");
        let totalConfirmed = document.createElement("td");
        let totalDeaths = document.createElement("td");
        let totalRecovered = document.createElement("td");
        countryName.innerText = country.Country;
        newConfirmed.innerText = country.NewConfirmed;
        newDeaths.innerText = country.NewDeaths;
        newRecovered.innerText = country.NewRecovered;
        totalConfirmed.innerText = country.TotalConfirmed;
        totalDeaths.innerText = country.TotalDeaths;
        totalRecovered.innerText = country.TotalRecovered;


        // }
        tableRow.appendChild(countryName);
        tableRow.appendChild(newConfirmed);
        tableRow.appendChild(newDeaths);
        tableRow.appendChild(newRecovered);
        tableRow.appendChild(totalConfirmed);
        tableRow.appendChild(totalDeaths);
        tableRow.appendChild(totalConfirmed);
        tableRow.appendChild(totalRecovered);
        table.appendChild(tableRow)
    })
}

getDataFromAPI();