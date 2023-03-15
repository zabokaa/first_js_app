// var arrow pokemonList
// name, height, types '' look at pdoex.org

let pokemonList = [
    {name: "venonant", height: 1.0, types: ["bug", "poison"],speed: 45},
    {name: "raticate", height: 0.7, types: "normal", speed: 97},
    {name: "tentacruel", height: 1.6, types: ["water", "poison"], speed: 100},
    {name: "voltorb", height: 0.5, types: "electric", speed: 100},
    {name: "spinda", height: 1.1, types: " normal", speed: 60}
];
// document.write(pokemonList[3].name);

/*Create for loop and inside it add a conditional. 
The conditional should check if the height is above a certain value (you’re free to pick whatever value you want). 
// If it is, add the note “Wow, that’s big!” to the output. */

// 2nd condition && (pokemonList[i].types === "posion")

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].speed >= 100) {
        document.write("wow, " + pokemonList[i].name + " is speedy" + " (speed: " + pokemonList[i].speed + ")! // ");
    }
    else {document.write(pokemonList[i].name + " (speed: " + pokemonList[i].speed + ") // "      
      );
    }
}



