let pokemonEncontrado;

//Funciones para buscar pokemon por id aleatorio o nombre
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
    const nombre = document.getElementById("nombreBusqueda").value.trim().toLowerCase();
        if (!nombreValido(nombre)) {
        return;
    }
    console.log(nombre);
    fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Pokémon no encontrado");
            }
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
        .catch(function (error) {
            alert(error.message);
        });
});

//funcion para agregar pokemon al equipo
const botonAgregarEquipo = document.getElementById("agregarEquipo");
botonAgregarEquipo.addEventListener("click", function(){
    if(!pokemonEncontrado){
        alert("Primero debes buscar un Pokémon");
        return;
    }
    const tablaEquipo = document.getElementById("tablaEquipo");

    if(equipoCompleto(tablaEquipo)){
        return;
    }

    if (pokemonRepetido(tablaEquipo, pokemonEncontrado.id)) {
    return;
}

    const fila = document.createElement("tr");
    const celdaNumero = document.createElement("td");
    const celdaNombre = document.createElement("td");
    const celdaTipo = document.createElement("td");

    celdaNumero.textContent = pokemonEncontrado.id;
    celdaNombre.textContent = pokemonEncontrado.name;
    celdaTipo.textContent = pokemonEncontrado.types[0].type.name;

    fila.appendChild(celdaNumero);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaTipo);
    
    tablaEquipo.appendChild(fila);
});

// Valoramos que el maximo de pokemons sean 6
function equipoCompleto(tablaEquipo){
    if (tablaEquipo.rows.length >= 6) {
        alert("El Equipo ya tiene 6 pokémon");
        return true;
    }
    return false;
}

function pokemonRepetido(tablaEquipo, idPokemon) {
    for (let i = 0; i < tablaEquipo.rows.length; i++) {
        const idGuardado =
            Number(tablaEquipo.rows[i].cells[0].textContent);

        if (idGuardado === idPokemon) {
            alert("Este Pokémon ya está en el equipo");
            return true;
        }
    }
    return false;
}

function nombreValido(nombre) {
    if (nombre.trim() === "") {
        alert("Escribe el nombre de un Pokémon");
        return false;
    }
    return true;
}