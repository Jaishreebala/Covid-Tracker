const table = document.querySelector("#country-list");
const countryAnalysis = document.querySelector("#countryAnalysis");
const index = document.querySelector("#index")
let country;

async function getDataFromAPI() {
    const fetchData = await fetch("https://api.covid19api.com/summary", {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    const data = await fetchData.json();
    // console.log(data.Countries);
    data.Countries.forEach(country => {
        // console.log(country)
        let tableRow = document.createElement("tr");
        // for(var i = 0 ; i<7; i++){
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
        // console.log(row)
        row.addEventListener("click", (e) => {
            if (!(e.target.innerText == "Country")) {
                country = e.target.parentNode.querySelectorAll("td")[7].innerText;
                localStorage.setItem("country", country);
                console.log(country)
                window.location.href = "./country.html";
                // console.log(countryAnalysis)
            }
        })
    })

}
if (index) {
    getDataFromAPI();
}
if (countryAnalysis) {
    var countryName = localStorage.getItem("country");

    alert("hi")
    console.log(country)

    // countryAnalysis.addEventListener("load", loadCharts(country))
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
// country = "canada"


