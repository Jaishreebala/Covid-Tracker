const table = document.querySelector("#country-list");
const countryAnalysis = document.querySelector("#countryAnalysis");
const index = document.querySelector("#index")
const countryData = document.querySelector("#countryData")
const form = document.querySelector("form");
const submitButton = document.querySelector("button");
const countrySearch = document.querySelector("input");
let country;

async function fetchAPI() {
    const fetchData = await fetch("https://api.covid19api.com/summary", {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    const data = await fetchData.json();
    return data;
}
async function getDataFromAPI() {
    const data = await fetchAPI();
    data.Countries.forEach(country => {
        let tableRow = document.createElement("tr");
        let countryName = document.createElement("td");
        let newConfirmed = document.createElement("td");
        let newDeaths = document.createElement("td");
        let newRecovered = document.createElement("td");
        let totalConfirmed = document.createElement("td");
        let totalDeaths = document.createElement("td");
        let totalRecovered = document.createElement("td");
        let countrySlug = document.createElement("td");

        countryName.innerText = country.Country;
        newConfirmed.innerText = country.NewConfirmed;
        newDeaths.innerText = country.NewDeaths;
        newRecovered.innerText = country.NewRecovered;
        totalConfirmed.innerText = country.TotalConfirmed;
        totalDeaths.innerText = country.TotalDeaths;
        totalRecovered.innerText = country.TotalRecovered;
        countrySlug.innerText = country.Slug;


        tableRow.appendChild(countryName);
        tableRow.appendChild(newConfirmed);
        tableRow.appendChild(newDeaths);
        tableRow.appendChild(newRecovered);
        tableRow.appendChild(totalConfirmed);
        tableRow.appendChild(totalDeaths);
        tableRow.appendChild(totalConfirmed);
        tableRow.appendChild(totalRecovered);
        tableRow.appendChild(countrySlug);
        table.appendChild(tableRow)
    })
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach(row => {
        row.addEventListener("click", (e) => {
            if (!(e.target.innerText == "Country")) {
                country = e.target.parentNode.querySelectorAll("td")[7].innerText;
                localStorage.setItem('country', JSON.stringify(country))
                window.location.href = "./country.html";
            }
        })
    })

}
async function findSlug(countryCompare) {
    const data = await fetchAPI();
    // const data = await fetchData.json();
    console.log(data.Countries)
    data.Countries.forEach(countries => {
        if ((countryCompare).localeCompare((countries.Country), undefined, { sensitivity: 'accent' }) == 0) {

            country = countries.Slug;
            // console.log(country)
            localStorage.setItem('country', JSON.stringify(country))
            console.log(localStorage.getItem('country'))
        }
    })
    window.location.href = "./country.html";
}
if (index) {
    getDataFromAPI();
    submitButton.addEventListener("click", searchForCountry);
    function searchForCountry(e) {
        e.preventDefault();
        if (countrySearch.value) {
            findSlug(countrySearch.value)
            console.log(localStorage.getItem('country'))
            // 
        }
    }

}
if (countryAnalysis) {
    console.log(localStorage.getItem('country'))

    var countryName = localStorage.getItem('country');
    countryName = countryName.substr(1, countryName.length - 2)
    console.log(countryName)
    countryAnalysis.addEventListener("load", loadCharts(countryName))
}
function loadCharts(country) {
    let deaths = [];
    let recovered = [];
    let active = [];
    let confirmed = [];
    let Labels = [];

    async function getDataFromAPI() {
        const fetchData = await fetch(`https://api.covid19api.com/total/country/${country}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        const data = await fetchData.json();
        data.forEach(country => {
            Labels.push(country.Date.substr(0, 10))
            deaths.push(country.Deaths);
            recovered.push(country.Recovered);
            confirmed.push(country.Confirmed);
            active.push(country.Active)
        })
        countryData.querySelector("h1").innerText = data[data.length - 1].Country
        countryData.querySelectorAll("span")[0].innerText = data[data.length - 1].Confirmed
        countryData.querySelectorAll("span")[1].innerText = data[data.length - 1].Recovered
        countryData.querySelectorAll("span")[2].innerText = data[data.length - 1].Deaths
        countryData.querySelectorAll("span")[3].innerText = data[data.length - 1].Active
        drawChart(recovered, "chartRecovered", "Recovered", "bar")
        drawChart(active, "chartActive", "Active Cases", "bar")
        drawChart(confirmed, "chartConfirmed", "Confirmed Cases", "bar")
        drawChart(deaths, "chartDeaths", "Total Deaths", "bar")
    }
    getDataFromAPI()
    function drawChart(chartData, chartId, label, chartType) {
        let canvas = document.getElementById(chartId).getContext('2d');
        let myChart = new Chart(canvas, {
            type: chartType,
            data: {
                labels: Labels,
                datasets: [{
                    data: chartData,
                    label: label,
                    borderColor: "#204d9a",
                    fill: true,
                    backgroundColor: "#3e95cd"
                }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: label,
                    position: 'bottom'
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Population'
                        }
                    }]
                }
            }
        })
    }

}