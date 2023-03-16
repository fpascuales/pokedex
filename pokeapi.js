export async function getPokemonsFromApi(){
    const pokemonArray = []
    for (let i = 1; i <= 200; i++){
    const pokemonCazado = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const pokemonObj = await pokemonCazado.json()
    pokemonArray.push(pokemonObj)
    }
    return pokemonArray
}

export async function getPokemonsAbilities(abilities){
    const abilitiesArray = []
    for (const ability of abilities){
    const abilityFetch = await fetch(ability.url)
    const abilityObj = await abilityFetch.json()
    abilitiesArray.push(abilityObj)
    }
    return abilitiesArray
}