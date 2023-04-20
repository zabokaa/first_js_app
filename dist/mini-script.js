let pokemonRepo=function(){let t=[];function e(e){t.push(e)}function a(){return t}function n(t){let e=t.detailsUrl;return $.ajax(e).then(e=>{t.height=e.height,t.weight=e.weight,t.imageUrl=e.sprites.other.dream_world.front_default}).catch(t=>console.error(t))}return{addToPokemonList:e,getPokemonListContents:a,loadDataFromApi:function t(){return $.ajax("https://pokeapi.co/api/v2/pokemon/?limit=99").then(t=>{t.results.forEach(t=>{e({name:t.name,detailsUrl:t.url})})}).catch(t=>console.error(t))},loadDetails:n,loadList:function t(e){n(e).then(()=>{let t=$(".row"),a=$("<div></div>").addClass("col-xs col-sm-6 col-md-4"),n=$("<div></div>").addClass("card pokemon-card text-center bg-light my-2 border border-warning"),o=$("<img>").addClass("card-img-top mx-auto my-3").attr({src:e.imageUrl}).css({width:"100px",height:"100px"}),r=$("<div></div>");r.addClass("card-body");let d=$("<button></button>").text(e.name).addClass("btn btn-primary btn-lg text-warning bg-secondary border border-warning").attr({type:"button","data-toggle":"modal","data-target":"#ModalCenter"});r.append(d),n.append(o),n.append(r),a.append(n),t.append(a),d.on("click",function(){var t;let a,n,o,r,d,l;t=e,a=$(".modal-body"),a.addClass("text-center"),n=$(".modal-title"),a.empty(),n.empty(),o=$("<h2></h2>"),o.text(t.name),r=$("<img>"),r.attr("src",t.imageUrl),r.addClass("text-center w-30"),d=$("<p></p>"),d.text(`height: ${t.height}`),l=$("<p></p>"),l.text(`weight: ${t.weight}`),n.append(o),a.append(r),a.append(d),a.append(l)})})}}}();function searchByName(){let t=$("#input").val().toUpperCase(),e=$("#pokemon-grid .card");for(i=0;i<e.length;i++){let a=e[i].querySelector(".card-body").querySelector(".btn");(a.textContent||a.innerText).toUpperCase().indexOf(t)>-1?e[i].style.display="":e[i].style.display="none"}}pokemonRepo.loadDataFromApi().then(function(){pokemonRepo.getPokemonListContents().forEach(t=>{pokemonRepo.loadList(t)})});let inputEle=$("#input");inputEle.on("keyup",searchByName);let clearSearchButton=$("#clear-search");clearSearchButton.on("click",function(){$("#input").val("").trigger("keyup")});