// IIFE:

let pokemonRepo = (function() {
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
      loadingMessage.innerText = "Loading...";
      document.body.appendChild(loadingMessage);
    };
    
    function hideLoadingMessage() {
      let loadingMessage = document.querySelector("div");
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
          console.log(pokemon);
        });
      };

    function showModal(title, text) {
      modalContainer.innerHTML = '';
      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "close";
      // closeButtonEle.addEventListener("click", hideModal);

      let titleEle = document.createElement("h1");
      titleElement.innerText = title;

      let contentEle = document.createElement("p");
      contentElement.innerText = text;
      
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add("is-visible");
    }

    function hideModal() {
      modalContainer,classList.remove("is-visible");
    }    

    window.addEventListener("keydown", (e) => {
      if (e.key === "escape" && modalContainer.classList.contains("is-visible")) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    document.querySelector("#show-modal").addEventListener("click", () => {
      showModal("Modal title", "My modal content placeholder!");
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

console.log(pokemonRepo.getAll());

let pokemon = {name: "spinda", height: 1.1, types: " normal", speed: 60};
console.log(pokemonRepo.add(pokemon));

pokemonRepo.loadList(pokemon).then(function() {
  pokemonRepo.getAll().forEach(function(pokemon) {
      pokemonRepo.addListItem(pokemon);           
  });
});



