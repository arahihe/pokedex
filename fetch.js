const POKEMON_URL = 'https://pokeapi.co/api/v2/';
let totalPokemonNumber = 0;

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${POKEMON_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }  catch (err) {
        return null;
        console.error(err);
    }
}

const searchPokemon = async() => {
    const text = document.getElementById("pokemon-name-search").value.toLocaleLowerCase();
    const pokemon = await fetchPokemon(text);
    if(pokemon){
        localStorage.setItem("currentPokemonId", pokemon.id);
        console.log(pokemon.name);
        createCard(pokemon);
    }else{
        alert('Pokémon no encontrado');
    }
}

document.getElementById('pokemon-name-search').addEventListener('keyup', async (event) => {
    if (event.keyCode == 13) { 
        await searchPokemon();
    } 
});



document.getElementById("submit-button").addEventListener('click', searchPokemon)

window.addEventListener("load", async () => {
    const storedId = localStorage.getItem("currentPokemonId");
    const intialId = storedId ? parseInt(storedId): 1; //ternario → ?
    console.log(intialId);
    const pokemon = await fetchPokemon(intialId);
    console.log(pokemon.name);
    createCard(pokemon);
});

document.getElementById("previous-button").addEventListener('click', async() => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId =  currentPokemonId > 1 ? currentPokemonId - 1 : 1;
    localStorage.setItem("currentPokemonId", newId);
    const pokemon = await fetchPokemon(newId);
    createCard(pokemon);
    console.log(pokemon.name);
});

document.getElementById("next-button").addEventListener('click', async() => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = (currentPokemonId + 1);
    const pokemon = await fetchPokemon(newId);
    if(pokemon){
        localStorage.setItem("currentPokemonId", newId);
        createCard(pokemon);
        console.log(pokemon.name);
    }else{
        alert("Pokémon no encontrado");
    }
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const createCard = (pokemon) => {
    console.log(pokemon.sprites);
    const cardContainer = document.getElementById("card-container");
    const card = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('p');
    const id = document.createElement('p');
    const weight = document.createElement('p');

    img.src = pokemon.sprites.front_default;
    img.alt = `Imagen de ${pokemon.name}`;
    name.textContent = `Nombre: ${capitalize(pokemon.name)}`;
    id.textContent = `ID: ${pokemon.id}`;
    weight.textContent = `Peso: ${pokemon.weight}`;

    card.classList.add("pokemon-card");
    img.classList.add("pokemon-img");
    name.classList.add("pokemon-name");
    id.classList.add("pokemon-id");
    weight.classList.add("pokemon-weight");

    card.append(img, name, id, weight);

    cardContainer.innerHTML = '';

    cardContainer.appendChild(card);


}