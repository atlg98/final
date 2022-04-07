const URL = "https://restcountries.com/v3.1";
const NATION_PLACEHOLDER_ID = "nation-cards";
const PAGINATOR_PLACEHOLDER_ID = "paginator";

function getAllCountries() {
    // Get param form url string
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    // Obtain param page and size
    const page = params.page;
    const size = params.size;

    console.log(page);
    console.log(size);

    let nationPlaceholder = document.getElementById(NATION_PLACEHOLDER_ID);
    let paginator = document.getElementById(PAGINATOR_PLACEHOLDER_ID);
    paginator.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        paginator.innerHTML +=
            `<li class="page-item">
                <a class="page-link" href="?page=${i}&size=${!size ? 12 : size}">${i + 1}</a>
            </li>`
    }

    fetch(`${URL}/all`).then(res => res.json()).then(data => {
        nationPlaceholder.innerHTML = "";

        // The start index and end index are calculated based on the page and size
        const start = (!page ? 0 : page) * (!size ? 12 : size)
        const end = start + parseInt(!size ? 12 : size, 10)

        console.log(start);
        console.log(end);

        const paginatedData = data.slice(start, end)
        paginatedData.forEach(item => {
            nationPlaceholder.innerHTML +=
                `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-2 mb-2">
                    <div class="card card border-dark">
                        <img class="card-img-top" style="height: 160px; object-fit: cover; width: 100%"
                            src="${item.flags.svg}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title long-and-truncated">${item.name.common}</h5>
                            <p class="card-text long-and-truncated">${item.name.official}</p>
                            <a  class="btn btn-outline-dark btn-block" 
                                href="./detail.html?name=${item.name.common}">
                                More detail
                            </a>
                        </div>
                    </div>
                </div>`;
        })
    })
}

getAllCountries();