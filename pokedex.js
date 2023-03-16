import { getPokemonsFromApi, getPokemonsAbilities } from "./pokeapi.js";

document.addEventListener('DOMContentLoaded', async () =>{
    const pokemons = await getPokemonsFromApi()
    const mappedPokemons = mapPokemons(pokemons)
    drawPokemons(mappedPokemons)
    drawSearch(mappedPokemons)
    drawTypesMenu(mappedPokemons)
})

//ESPACIO CENTRAL DE LA POKEDEX
const mapPokemons = (pokemons) => {
        return pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites['other']['official-artwork']['front_default'],
        type: pokemon.types.map((type) => type.type.name),
        abilities: pokemon.abilities.map((ability) => ability.ability),
        stats: pokemon.stats.map((stat) => {return {name: stat.stat.name, valor: stat.base_stat}}),
        typeClass: pokemon.types[0].type.name   //Para darle estilo al div, según tipo principal
    }))
}

const drawPokemons = (pokemons) => {
    const divPokedex$$ = document.querySelector('#div-pokedex')
    divPokedex$$.innerHTML = ""
    for (const pokemon of pokemons) {
        const pokemonDiv$$ = document.createElement("div")

        pokemonDiv$$.setAttribute("id", pokemon.name)
        pokemonDiv$$.className = `pokemon-card pokemon-card--${pokemon.typeClass} col-5 col-md-5 col-lg-2`

        const cardHeader$$ = document.createElement("div")
        cardHeader$$.className = "card-header"

        const pokemonNum$$ = document.createElement("h3")
        pokemonNum$$.className = "card-num"
        pokemonNum$$.innerHTML = `#${pokemon.id}`

        const pokemonName$$ = document.createElement("h3")
        pokemonName$$.className = "card-name"
        pokemonName$$.innerHTML = pokemon.name

        const cardBody$$ = document.createElement("div")
        cardBody$$.className = "card-body"

        const cardTypes$$ = document.createElement("div")
        cardTypes$$.className = "card-types"

        for (const type of pokemon.type) {
            const pokemonType$$ = document.createElement("span")
            pokemonType$$.className = "card-type"
            pokemonType$$.innerHTML = type
            cardTypes$$.appendChild(pokemonType$$)
        }        

        const cardImg$$ = document.createElement("div")
        cardImg$$.className = "card-img"

        const pokemonImg$$ = document.createElement("img")
        pokemonImg$$.setAttribute("src", pokemon.image)
        pokemonImg$$.setAttribute("alt", pokemon.name)
        pokemonImg$$.className = "card-pokemon-img"

        cardHeader$$.appendChild(pokemonNum$$)
        cardHeader$$.appendChild(pokemonName$$)

        cardImg$$.appendChild(pokemonImg$$)

        cardBody$$.appendChild(cardTypes$$)
        cardBody$$.appendChild(cardImg$$)
        
        pokemonDiv$$.appendChild(cardHeader$$)
        pokemonDiv$$.appendChild(cardBody$$)

        divPokedex$$.appendChild(pokemonDiv$$)
        searchPokemonFile(pokemon.name, pokemons)
    }
}

const drawSearch = (pokemons) => {
    const inputSearch$$ = document.querySelector('.input-search')
    let tempSearch = null
    inputSearch$$.addEventListener("keyup", () => {
        if(tempSearch){
            clearTimeout(tempSearch)
        }
        tempSearch = setTimeout(() => {
            searchPokemonsByName(inputSearch$$.value, pokemons)
            inputSearch$$.value = ''
        }, 1*1000)

    })
}

const searchPokemonsByName = (filtro, pokemons) => {
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(filtro.toLowerCase()))
    drawPokemons(filteredPokemons)
}

//ESPACIO IZQUIERDA. MENÚ DE TIPOS

const drawTypesMenu = (pokemons) => {
    const divTypes$$ = document.querySelector('#div-types')
    const arrayTypes = []
    for (const pokemon of pokemons) {
        for (const type of pokemon.type) {
            if(!arrayTypes.includes(type)){
                arrayTypes.push(type)
                const divType$$ = document.createElement("div")
                divType$$.setAttribute("id", type)
                divType$$.className = `type-card type-card--${type} col-md-4`

                const nameType$$ = document.createElement("span")
                nameType$$.className = "menu-type"
                nameType$$.innerHTML = type

                divType$$.appendChild(nameType$$)
                divTypes$$.appendChild(divType$$)

                drawSearchType(nameType$$.innerHTML, pokemons)
            }
        }
    }
}
const drawSearchType = (pokemonType, pokemons) => {
    const divType = document.querySelector(`#${pokemonType}`)
    divType.addEventListener('click', () => {
        searchPokemonsByType(divType.id, pokemons)
    })
}
const searchPokemonsByType = (filtro, pokemons) => {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.type.includes(filtro))
    drawPokemons(filteredPokemons)
}

//ESPACIO DERECHA. FICHA POKEMON

const searchPokemonFile = (filtro, pokemons) => {
    const divPokemon = document.querySelector(`#${filtro}`)
    divPokemon.addEventListener('click', () => {
        const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(filtro.toLowerCase()))
        drawPokemonFile(filteredPokemon[0])
    })
}

const drawPokemonFile = async (pokemon) => {
    console.log(pokemon);
    const abilities = await getPokemonsAbilities(pokemon.abilities)
    // const filteredAbilities = filterAbilities(abilities)
    const divFicha = document.querySelector('#div-ficha')
    divFicha.innerHTML = ''
    
    const fichaPokemon$$ = document.createElement("div")
    fichaPokemon$$.className = "ficha-pokemon"

    const fichaHeader$$ = document.createElement("div")
    fichaHeader$$.className = "ficha-header"

    const pokemonNum$$ = document.createElement("h3")
    pokemonNum$$.className = "pokemon-num"
    pokemonNum$$.innerHTML = `#${pokemon.id}`

    const pokemonName$$ = document.createElement("h3")
    pokemonName$$.className = "pokemon-name"
    pokemonName$$.innerHTML = pokemon.name

    const fichaImg$$ = document.createElement("div")
    fichaImg$$.className = "ficha-img"
    
    const pokemonImg$$ = document.createElement("img")
    pokemonImg$$.setAttribute("src", pokemon.image)
    pokemonImg$$.setAttribute("alt", pokemon.name)
    pokemonImg$$.className = "pokemon-img"

    const fichaTypes$$ = document.createElement("div")
    fichaTypes$$.className = "ficha-types"

    const pokemonTypes$$ = document.createElement("h5")
    pokemonTypes$$.innerHTML = "Tipo"

    fichaTypes$$.appendChild(pokemonTypes$$)

    for (const type of pokemon.type) {
        const pokemonType$$ = document.createElement("span")
        pokemonType$$.className = "card-type"
        pokemonType$$.innerHTML = type
        fichaTypes$$.appendChild(pokemonType$$)
    }      

    const fichaStats$$ = document.createElement("div")
    fichaStats$$.className = "ficha-stats"

    const pokemonStats$$ = document.createElement("h5")
    pokemonStats$$.innerHTML = "Estadísitcas"

    fichaStats$$.appendChild(pokemonStats$$)
    
    for (const stat of pokemon.stats) {
        const divStat$$ = document.createElement("div")
        divStat$$.className = "ficha-stat"

        const statName$$ = document.createElement("span")
        statName$$.className = "span-stat"
        statName$$.innerHTML = stat.name

        const statValue$$ = document.createElement("span")
        statValue$$.className = "span-stat span-stat--value"
        statValue$$.innerHTML = stat.valor

        const divFillStat$$ = document.createElement("div")
        divFillStat$$.className = "stat-fill"
        if(stat.valor >= 100){
            divFillStat$$.className = "stat-fill stat-fill--100"
            divFillStat$$.style.width = `100%`
        }
        else{
            divFillStat$$.style.width = `${stat.valor}%`
        }        
       

        divStat$$.appendChild(divFillStat$$)
        divStat$$.appendChild(statName$$)
        divStat$$.appendChild(statValue$$)
        

        fichaStats$$.appendChild(divStat$$)
    }

    const fichaAbilities$$ = document.createElement("div")
    fichaAbilities$$.className = "ficha-abilities"

    const pokemonAbilities$$ = document.createElement("h5")
    pokemonAbilities$$.innerHTML = "Habilidades"

    fichaAbilities$$.appendChild(pokemonAbilities$$)

    const abilitiesList$$ = document.createElement("div")
    abilitiesList$$.className = "abilities-list"

    for (const ability of pokemon.abilities) {
        const pokemonAbility$$ = document.createElement("span")
        pokemonAbility$$.className = "card-type"
        pokemonAbility$$.innerHTML = ability.name
        abilitiesList$$.appendChild(pokemonAbility$$)
    }  

    fichaHeader$$.appendChild(pokemonNum$$)
    fichaHeader$$.appendChild(pokemonName$$)

    fichaImg$$.appendChild(pokemonImg$$)

    fichaAbilities$$.appendChild(abilitiesList$$)

    fichaPokemon$$.appendChild(fichaHeader$$)
    fichaPokemon$$.appendChild(fichaImg$$)
    fichaPokemon$$.appendChild(fichaTypes$$)
    fichaPokemon$$.appendChild(fichaStats$$)
    fichaPokemon$$.appendChild(fichaAbilities$$)

    divFicha.appendChild(fichaPokemon$$)

}
// const filterAbilities = (abilities) => {
//     const arrayAbilities = abilities.map(x=>x.flavor_text_entries).flat().filter(x=>x.language.name === "es").map(x=>x.flavor_text)
// }
