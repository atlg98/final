const URL = "https://restcountries.com/v3.1";
const NATION_DROPDOWN_ID = 'nation-dropdown'

const NATION_NAME_ID = "nation-name";
const NATION_POP_ID = "nation-pop";
const NATION_LANG_ID = "nation-lang";
const NATION_SIZE_ID = "nation-size";
const NATION_REGION_ID = "nation-region";
const NATION_CURRENCY_ID = "nation-currency";
const NATION_CAP_ID = "nation-cap";
const NATION_FLAG_ID = "nation-flag";

function loadCountryByName(name) {

    console.log("Nation", name)
    if (!name || name === "") {
        name = "vietnam";
    }

    let nationName = document.getElementById(NATION_NAME_ID);
    let nationPop = document.getElementById(NATION_POP_ID);
    let nationLang = document.getElementById(NATION_LANG_ID);
    let nationSize = document.getElementById(NATION_SIZE_ID);
    let nationRegion = document.getElementById(NATION_REGION_ID);
    let nationCurrency = document.getElementById(NATION_CURRENCY_ID);
    let nationCap = document.getElementById(NATION_CAP_ID);
    let nationFlag = document.getElementById(NATION_FLAG_ID);
    fetch(`${URL}/name/${name}`).then(res => res.json()).then(data => {
        data = data[0]
        nationName.innerText = data.name.common + " - " + data.name.official;
        nationPop.innerText = data.population;
        nationCurrency.innerText = data.currencies[Object.keys(data.currencies)[0]].name
        nationLang.innerText = data.languages[Object.keys(data.languages)[0]];
        nationSize.innerText = data.area;
        nationRegion.innerText = data.continents[Object.keys(data.continents)[0]];
        nationCap.innerText = data.capital[Object.keys(data.capital)[0]]
        nationFlag.innerHTML = `
            <img src="${data.flags.svg}" style="width: 300px; margin:0; padding: 0; object-fit:cover; height: 25vh" alt="nation-image" />
        `
    })
}

function getNationNameForDropdown(size = 10) {
    let dropdown = document.getElementById(NATION_DROPDOWN_ID);
    fetch(`${URL}/all`).then(res => res.json()).then(data => {
        data.slice(0, size).forEach(item  => {
            dropdown.innerHTML += `<option value="${item.name.common}"> ${item.region} ${item.subregion} - ${item.name.common}</option>`
        });
        
    })
}

function searchName() {
    const input = document.getElementById("search-name");
    loadCountryByName(input.value)
}

const search = document.getElementById("search-name");
getNationNameForDropdown(19);
if (!search || !search.value || search.value === "") {
    loadCountryByName("vietnam")
}
