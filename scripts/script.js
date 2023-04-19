let pokemonRepo = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=99";

	function addToPokemonList(pokemonFromApi) {
		pokemonList.push(pokemonFromApi);
	}
	function getPokemonListContents() {
		return pokemonList;
	}
	// // Loads initial object of name and detailsUrl and adds it to the pokemonList
	function loadDataFromApi() {
		return $.ajax(apiUrl)
			.then((data) => {
				data.results.forEach((item) => {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					addToPokemonList(pokemon);
				});
			})
			.catch((err) => console.error(err));
	}

	// // Loads the auxiliary details as key/value pairs for each Pokemon and stores it in the pokemonList
	function loadDetails(listItem) {
		let url = listItem.detailsUrl;
		return $.ajax(url)
			.then((data) => {
				listItem.height = data.height;
				listItem.weight = data.weight;
				listItem.imageUrl = data.sprites.other.dream_world.front_default;
			})
			.catch((err) => console.error(err));
	}

	function loadList(pokemon) {
		loadDetails(pokemon).then(() => {
			let pokemonGrid = $(".row");
			let cardContainer = $('<div></div>').addClass('col-xs col-sm-6 col-md-4');
			let card = $('<div></div>').addClass('card pokemon-card text-center bg-light my-2 border border-warning');

			let cardImg = $('<img>')
				.addClass('card-img-top mx-auto my-3')
				.attr({src: pokemon.imageUrl})
				.css({width: "100px", height: "100px"});

			let cardBody = $('<div></div>');
			cardBody.addClass('card-body');

			let modalButton = $('<button></button>')
				.text(pokemon.name)
				.addClass('btn btn-primary btn-lg text-warning bg-secondary border border-warning')
				.attr({
					type: 'button',
					'data-toggle': 'modal',
					'data-target': '#ModalCenter',
				});

			cardBody.append(modalButton);
			card.append(cardImg);
			card.append(cardBody);
			cardContainer.append(card);
			pokemonGrid.append(cardContainer);

			modalButton.on('click', function () {
				showModal(pokemon);
			});
		});
	}
	function showModal(pokemon) {
		let modalBody = $('.modal-body');
		modalBody.addClass('text-center');

		let modalTitle = $('.modal-title');

		modalBody.empty();
		modalTitle.empty();

		let name = $('<h2></h2>');
		name.text(pokemon.name);
		// name.addClass('text-capitalize');

		let imgEle = $('<img>');
		imgEle.attr('src', pokemon.imageUrl);
		imgEle.addClass('text-center w-30');

		let heightEle = $('<p></p>');
		heightEle.text(`height: ${pokemon.height}`);

		let weightEle = $('<p></p>');
		weightEle.text(`weight: ${pokemon.weight}`);

		modalTitle.append(name);
		modalBody.append(imgEle);
		modalBody.append(heightEle);
		modalBody.append(weightEle);

	}

	return {   //key values
		addToPokemonList: addToPokemonList,
		getPokemonListContents: getPokemonListContents,
		loadDataFromApi: loadDataFromApi,
		loadDetails: loadDetails,
		loadList: loadList
	};
})();

pokemonRepo.loadDataFromApi().then(function () {
	pokemonRepo.getPokemonListContents().forEach((pokemon) => {
		pokemonRepo.loadList(pokemon);
	});
});

function searchByName() {
	// let filter, cards, a, txtValue;
	let filter = $('#input').val().toUpperCase();
	let cards = $('#pokemon-grid .card');
	for (i = 0; i < cards.length; i++) {
		let card = cards[i].querySelector('.card-body').querySelector('.btn');

		let textCont = card.textContent || card.innerText;
		if (textCont.toUpperCase().indexOf(filter) > -1) {
			cards[i].style.display = '';
		} else {
			cards[i].style.display = 'none';
		}
	}
}
let inputEle = $('#input');
inputEle.on('keyup', searchByName);

let clearSearchButton = $('#clear-search');
clearSearchButton.on('click', function () {
	$('#input').val('').trigger('keyup');
});

