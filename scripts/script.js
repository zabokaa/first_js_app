// var arrow pokemonList
// name, height, types '' look at pdoex.org

let pokemonList = [
    {name: "venonant", height: 1.0, types: ["bug", "poison"],speed: 45},
    {name: "raticate", height: 0.7, types: "normal", speed: 97},
    {name: "tentacruel", height: 1.6, types: ["water", "poison"], speed: 100},
    {name: "voltorb", height: 0.5, types: "electric", speed: 100},
    {name: "spinda", height: 1.1, types: " normal", speed: 60}
];
document.write(pokemonList[3].name);

/*Create for loop and inside it add a conditional. 
The conditional should check if the height is above a certain value (you’re free to pick whatever value you want). 
// If it is, add the note “Wow, that’s big!” to the output. */


// for (let i = 0; i < pokemonList.length; i++) {
//     if ((pokemonList[i].speed >= 70) && (pokemonList[i].types === "normal")) {
//         document.write("wow, " + pokemonList[i].name + " is speedy" + " (speed: " + pokemonList[i].speed + ") and poisonous! // ");
//     }
//     else {
//         document.write(pokemonList[i].name + " (speed: " + pokemonList[i].speed + ") // ");
//     }
// }

// Use a forEach() function instead of the for loop (Exc.1_5)

pokemonList.forEach(function(pokemon) {
            if ((pokemon.speed >= 70) && (pokemon.types === "normal")) {
                document.write("wow, " + pokemon.name + " is speedy" + " (speed: " + pokemon.speed + ") and poisonous!" + "<br>");
            }
            else {
                document.write(pokemon.name + " (speed: " + pokemon.speed + ")" + "<br>");
            };
});


// function printNames(){
//     for (let i = 0; i < pokemonList.length; i++){
//         document.write(pokemonList[i].name + "<br>");
//     }
// }

// // calling th function twice:
// printNames();
// printNames();

function helloMsg (firstName, lastName) {
    document.write("Hola, me llamo " + firstName + " " + lastName + "! ")
}
helloMsg ("Rosa", "Luxemburg");
helloMsg ("Minerva","Mirabel");

function Sum(val1, val2) {
    return val1 - val2;
}

document.write(Sum(10, 5));

let age = 12;

function getNewAge(age) {
 age ++;
 return age;
}

document.write("<p>" + getNewAge(age) + "</p>");
