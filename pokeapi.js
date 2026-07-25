let pokemonEncontrado;

const botonAleatorio = document.getElementById("buscarAleatorio");
botonAleatorio.addEventListener("click", function(){
    const numeroAleatorio = Math.floor(Math.random() * 150) + 1;
    fetch("https://pokeapi.co/api/v2/pokemon/" + numeroAleatorio)
        .then(function (respuesta){
            return respuesta.json();
        })
        .then(function(pokemon){
            pokemonEncontrado = pokemon;
            console.log("Información del pokemon encontrado" + pokemonEncontrado);

            document.getElementById("nombrePokemon").textContent = pokemon.name;
            document.getElementById("numeroPokemon").textContent = pokemon.id;
            document.getElementById("tipoPokemon").textContent = pokemon.types[0].type.name;
            document.getElementById("imagenPokemon").src = pokemon.sprites.front_default;
        })
        
});

const botonPorNombre = document.getElementById("buscarPorNombre");
botonPorNombre.addEventListener("click", function(){
    const nombre = document.getElementById("nombreBusqueda").value;
    console.log(nombre);
    fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(pokemon){
            pokemonEncontrado = pokemon;
            console.log("Información del pokemon encontrado" + pokemonEncontrado);
            document.getElementById("nombrePokemon").textContent = pokemon.name;
            document.getElementById("numeroPokemon").textContent = pokemon.id;
            document.getElementById("tipoPokemon").textContent = pokemon.types[0].type.name;
            document.getElementById("imagenPokemon").src = pokemon.sprites.front_default;
        })
});

const botonAgregarEquipo.addEventListener("click", function(){
    if(!pokemonActual){
        alert("Primero debes buscar un Pokémon");
        return;
    }
    const tablaEquipo = document.getElementById("tablaEquipo");

    const fila = document.createElement("tr");
    const celdaNumero = document.createElement("td");
    const celdaNumero = document.createElement("td");
    const celdaNumero = document.createElement("td");

    celdaNumero.textContent = pokemonActual.id;
    celdaNombre.textContent = pokemonActual.nombre;
    celdaTipo.textContent = pokemonActual.id;
});