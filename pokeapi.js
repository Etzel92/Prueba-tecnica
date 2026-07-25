let pokemonEncontrado;

function capitalizarTexto(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

//funcion para la información del pokémon encontrado
function mostrarPokemon(pokemon) {
    pokemonEncontrado = pokemon;

    document.getElementById("info").classList.remove("d-none");
    document.getElementById("nombrePokemon").textContent = capitalizarTexto(pokemon.name);
    document.getElementById("numeroPokemon").textContent = pokemon.id;

    const tipos = pokemon.types.map(function (tipo) {
        return capitalizarTexto(tipo.type.name);
    });

    document.getElementById("tipoPokemon").textContent = tipos.join(", ");
    document.getElementById("imagenPokemon").src = pokemon.sprites.other["official-artwork"].front_default;
}

//elementos para seleccionar el tipo de búsqueda
const botonAleatorio = document.getElementById("buscarAleatorio");
const botonPorNombre = document.getElementById("buscarPorNombre");
const tituloBusqueda = document.getElementById("tituloBusqueda");
const descripcionBusqueda = document.getElementById("descripcionBusqueda");
const campoNombre = document.getElementById("campoNombre");
const botonBuscar = document.getElementById("botonBuscar");

botonAleatorio.addEventListener("change", function () {
    tituloBusqueda.textContent = "Buscar Pokémon por ID aleatorio";
    descripcionBusqueda.textContent = "Buscar un pokémon entre el 1 y el 150";
    botonBuscar.textContent = "Buscar pokémon aleatorio";
    campoNombre.classList.add("d-none");
});

botonPorNombre.addEventListener("change", function () {
    tituloBusqueda.textContent = "Buscar Pokémon por nombre";
    descripcionBusqueda.textContent = "Escribe el nombre del pokémon que deseas buscar";
    botonBuscar.textContent = "Buscar pokémon por nombre";
    campoNombre.classList.remove("d-none");
});

function actualizarBordesRadios() {
    if (botonAleatorio.checked) {
        botonAleatorio.style.border = "";
        botonPorNombre.style.border = "2px solid #495057";
    } else {
        botonAleatorio.style.border = "2px solid #495057";
        botonPorNombre.style.border = "";
    }
}

//funcion para buscar pokemon por id aleatorio o nombre
botonBuscar.addEventListener("click", function () {
    if (botonAleatorio.checked) {
        const numeroAleatorio = Math.floor(Math.random() * 150) + 1;

        fetch("https://pokeapi.co/api/v2/pokemon/" + numeroAleatorio)
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error("Pokémon no encontrado");
                }

                return respuesta.json();
            })
            .then(function (pokemon) {
                mostrarPokemon(pokemon);
            })
            .catch(function (error) {
                alert(error.message);
            });

        return;
    }

    const nombre = document
        .getElementById("nombreBusqueda")
        .value.trim()
        .toLowerCase();

    if (!nombreValido(nombre)) {
        return;
    }

    fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Pokémon no encontrado");
            }

            return respuesta.json();
        })
        .then(function (pokemon) {
            mostrarPokemon(pokemon);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

//funcion para agregar pokemon al equipo
const botonAgregarEquipo = document.getElementById("agregarEquipo");
botonAgregarEquipo.addEventListener("click", function () {
    if (!pokemonEncontrado) {
        alert("Primero debes buscar un Pokémon");
        return;
    }

    const tablaEquipo = document.getElementById("tablaEquipo");

    if (equipoCompleto(tablaEquipo)) {
        return;
    }

    if (pokemonRepetido(tablaEquipo, pokemonEncontrado.id)) {
        return;
    }

    const fila = document.createElement("tr");
    const celdaNumero = document.createElement("td");
    const celdaImagen = document.createElement("td");
    const celdaNombre = document.createElement("td");
    const celdaTipo = document.createElement("td");
    const celdaEliminar = document.createElement("td");

    const imagenEquipo = document.createElement("img");
    imagenEquipo.src = pokemonEncontrado.sprites.front_default;
    imagenEquipo.alt = "Imagen de " + pokemonEncontrado.name;
    imagenEquipo.classList.add("imagen-equipo");

    const seleccionarPokemon = document.createElement("input");
    seleccionarPokemon.type = "checkbox";
    seleccionarPokemon.classList.add("form-check-input", "seleccionar-pokemon");

    celdaNumero.textContent = pokemonEncontrado.id;
    celdaImagen.appendChild(imagenEquipo);
    celdaNombre.textContent = capitalizarTexto(pokemonEncontrado.name);
    celdaEliminar.appendChild(seleccionarPokemon);

    const tiposPokemon = pokemonEncontrado.types.map(function (tipo) {
        return capitalizarTexto(tipo.type.name);
    });

    celdaTipo.textContent = tiposPokemon.join(", ");

    fila.appendChild(celdaNumero);
    fila.appendChild(celdaImagen);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaTipo);
    fila.appendChild(celdaEliminar);

    tablaEquipo.appendChild(fila);

    document.getElementById("equipo").classList.remove("d-none");
});

//valoramos que el maximo de pokemons sean 6
function equipoCompleto(tablaEquipo) {
    if (tablaEquipo.rows.length >= 6) {
        alert("El equipo ya tiene 6 Pokémon");
        return true;
    }

    return false;
}

//validamos que no se repita el pokémon
function pokemonRepetido(tablaEquipo, idPokemon) {
    for (let i = 0; i < tablaEquipo.rows.length; i++) {
        const idGuardado = Number(tablaEquipo.rows[i].cells[0].textContent);

        if (idGuardado === idPokemon) {
            alert("Este Pokémon ya está en el equipo");
            return true;
        }
    }

    return false;
}

//validamos que se haya escrito un nombre
function nombreValido(nombre) {
    if (nombre.trim() === "") {
        alert("Escribe el nombre de un Pokémon");
        return false;
    }

    return true;
}

//mostramos más información del pokémon
const botonMasInfo = document.getElementById("verMasInformacion");
const masInfoPokemon = document.getElementById("masInfoPokemon");
const botonCerrarInfo = document.getElementById("botonCerrarInfo");

botonMasInfo.addEventListener("click", function () {
    if (!pokemonEncontrado) {
        alert("Primero debes buscar un Pokémon");
        return;
    }

    document.getElementById("alturaPokemon").textContent = pokemonEncontrado.height / 10 + " m";
    document.getElementById("pesoPokemon").textContent = pokemonEncontrado.weight / 10 + " kg";
    document.getElementById("experienciaPokemon").textContent = pokemonEncontrado.base_experience;

    const listaHabilidades = document.getElementById("habilidadesPokemon");

    listaHabilidades.innerHTML = "";

    pokemonEncontrado.abilities.forEach(function (habilidad) {
        const elementoHabilidad = document.createElement("li");

        elementoHabilidad.textContent = capitalizarTexto(habilidad.ability.name);

        if (habilidad.is_hidden) {
            elementoHabilidad.textContent += " (oculta)";
        }

        listaHabilidades.appendChild(elementoHabilidad);
    });

    document.getElementById("saludPokemon").textContent = pokemonEncontrado.stats[0].base_stat;
    document.getElementById("ataquePokemon").textContent = pokemonEncontrado.stats[1].base_stat;
    document.getElementById("defensaPokemon").textContent = pokemonEncontrado.stats[2].base_stat;
    document.getElementById("ataqueEspecialPokemon").textContent = pokemonEncontrado.stats[3].base_stat;
    document.getElementById("defensaEspecialPokemon").textContent = pokemonEncontrado.stats[4].base_stat;
    document.getElementById("velocidadPokemon").textContent = pokemonEncontrado.stats[5].base_stat;

    masInfoPokemon.showModal();
});

botonCerrarInfo.addEventListener("click", function () {
    masInfoPokemon.close();
});


const botonEliminarSeleccionados = document.getElementById("eliminarSeleccionados");
botonEliminarSeleccionados.addEventListener("click", function () {
    const pokemonSeleccionados = document.querySelectorAll(".seleccionar-pokemon:checked");

    if (pokemonSeleccionados.length === 0) {
        alert("Selecciona al menos un Pokémon");
        return;
    }

    pokemonSeleccionados.forEach(function (pokemonSeleccionado) {
        pokemonSeleccionado.closest("tr").remove();
    });

    const tablaEquipo = document.getElementById("tablaEquipo");

    if (tablaEquipo.rows.length === 0) {
        document.getElementById("equipo").classList.add("d-none");
    }
});