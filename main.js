let currentPage = 1;
let totalPages = 1;

function getCharacters(pageNumber, done) {
    const apiUrl = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            done(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function displayCharacters(data) {
    const main = document.getElementById("main");

    main.innerHTML = "";

    data.results.forEach(personaje => {
        const div = document.createElement("div");
        div.classList.add("container-img");
        div.innerHTML = `
            <div class="container-img">
                <img class="img" src="${personaje.image}" alt="">
                <div class="container-stats">
                    <h2 class="h2">${personaje.name}</h2>
                    <div class="container-species">
                        <small class="alive">${personaje.status} -</small>
                        <small class="alive">${personaje.species}</small>
                    </div>
                    <h3 class="place">${personaje.location.name}</h3>
                </div>
            </div>
        `;
        main.append(div);
    });

    totalPages = data.info.pages;

    const divselect = document.getElementById("div-select");
    divselect.classList.add("div-select");
    divselect.innerHTML = `
        <button class="sig-ant" id="ant">Página Anterior</button>
        <button class="sig-ant" id="sig">Página Siguiente</button>
    `;
    const loadMoreButton = document.getElementById("sig");
    const loadLessButton = document.getElementById("ant");

    if (currentPage === 1) {
        loadLessButton.style.display = "none";
    } else {
        loadLessButton.style.display = "block";
    }

    if (currentPage === totalPages) {
        loadMoreButton.style.display = "none";
    } else {
        loadMoreButton.style.display = "block";
    }

    loadMoreButton.addEventListener("click", () => {
        currentPage++;
        getCharacters(currentPage, displayCharacters);
    });

    loadLessButton.addEventListener("click", () => {
        currentPage--;
        getCharacters(currentPage, displayCharacters);
    });

    divselect.append(loadMoreButton);
}

getCharacters(currentPage, displayCharacters);
