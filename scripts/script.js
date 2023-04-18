// IIFE:

let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=99";
  // let searchPoki = document.querySelector("#search-poki");

  function getAll() {
    return pokemonList;
  };

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    }
    else {
      console.log("uncorrect pokemon");
    }
  };

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("button-class");
    button.innerText = pokemon.name;
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    /* adding 1st event listener: */
    button.addEventListener("click", () => showDetails(pokemon));
  };

  function showLoadingMessage() {
    let loadingMessage = document.createElement("div");
    loadingMessage.setAttribute("id", "loading-message")
    loadingMessage.innerText = "Loading...";
    document.body.prepend(loadingMessage);
  };

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector("#loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  };

  // Look for your fav poki
  // searchInput.addEventListener("input", function () {
  //   pokemonRepo.filterSearch(searchPoki);
  // });

  // function filterSearch(searchPoki) {
  //   let filterValue = searchPoki.value.toLowerCase();
  
  //   // filter the pokemonList array based on the filterValue
  //   let filteredPokemon = pokemonList.filter(function (pokemon) {
  //     return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
  //   });
  
  //   // update the displayed list of Pokemon based on the filtered results
  //   let pokemonListElement = document.querySelector(".pokemon-list");
  //   pokemonListElement.innerHTML = "";
  //   filteredPokemon.forEach(function (pokemon) {
  //     pokemonRepository.addListItem(pokemon);
  //   });
  // }
  function loadDetails(pokemon) {
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
    }).catch(function (e) {
      hideLoadingMessage(e);
      console.error(e);
    });
  };

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage(e);
      console.error(e);
    });
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  };

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    let titleEle = $("<h1>" + pokemon.name + "</h1>");
    let imageEle = $('<img class="modal-img"');
    imageEle.attr("src", pokemon.imageUrl);
  
 
    let contentEle = $("<p>" + "heigth: " + pokemon.height + "</p>");
    let weightEle = $("<p>" + "weight: " + pokemon.weight + "</p>");

    modalTitel.append(titleEle);
    modalBody.append(imageEle);
    modalBody.append(contentEle);
    modalBody.append(weightEle);
    }
 
  return {
    getAll: getAll,     //key values
    add: add,
    addListItem: addListItem,
    loadDetails: loadDetails,
    loadList: loadList,
    // filterSearch: filterSearch,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    // hideModal: hideModal
  };

})();  //self executing func

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});


