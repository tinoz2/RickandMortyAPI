function getCharacters(done) {
    const results = fetch("https://rickandmortyapi.com/api/character")
    
        results
        .then(response => response.json())
        .then(data => {
            done(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

getCharacters(data => {
    
    console.log(data)
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
        `
        const main = document.getElementById("main");
        main.append(div);
    })
});
