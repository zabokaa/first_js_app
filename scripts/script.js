// IIFE:

let pokemonRepo = (function() {
    let pokemonList = [
        {name: "venonant", height: 1.0, types: ["bug", "poison"],speed: 45},
        {name: "raticate", height: 0.7, types: "normal", speed: 97},
        {name: "tentacruel", height: 1.6, types: ["water", "poison"], speed: 100},
        {name: "voltorb", height: 0.5, types: "electric", speed: 100}
    ];

    function getAll() {
        return pokemonList;
    };
    
    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        }  
    };

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("ol");
        let button = document.createElement("button");
        button.classList.add("button-class");
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }
    
    return {
        getAll: getAll,     //key values
        add: add,
        addListItem: addListItem
    };
})();  //self executing func

console.log(pokemonRepo.getAll());

let pokemon = {name: "spinda", height: 1.1, types: " normal", speed: 60};
console.log(pokemonRepo.add(pokemon));

console.log(typeof pokemon);

pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);        
         
});



