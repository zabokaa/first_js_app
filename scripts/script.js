// IIFE:

let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=99";
  let modalContainer = document.querySelector("#modal-container");

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

  function loadDetails(pokemon) {
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
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

    modalContainer.innerHTML = " ";
 

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonEle = document.createElement("button");
    closeButtonEle.classList.add("modal-close");
    closeButtonEle.innerText = "close";
    closeButtonEle.addEventListener("click", hideModal);

    let titleEle = document.createElement("h1");
    titleEle.innerText = pokemon.name;

    let imageEle = document.createElement("img");
    imageEle.src = pokemon.imageUrl;
    imageEle.classList.add("pokemon-image");

    let contentEle = document.createElement("p");
    contentEle.innerText = "height: ${pokemon.height}";

    modal.appendChild(closeButtonEle);
    modal.appendChild(titleEle);
    modal.appendChild(imageEle);
    modal.appendChild(contentEle);
    modalContainer.appendChild(modal);
   

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    getAll: getAll,     //key values
    add: add,
    addListItem: addListItem,
    loadDetails: loadDetails,
    loadList: loadList,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    hideModal: hideModal
  };

})();  //self executing func

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});


