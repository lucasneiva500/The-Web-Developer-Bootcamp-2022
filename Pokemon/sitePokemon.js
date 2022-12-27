const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

for (let i = 1; i <= 898; i++) {
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');

    const label = document.createElement('span');
    label.innerText = `#${i}`;

    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${i}.png`;

    pokemon.appendChild(newImg);
    pokemon.appendChild(label);
    container.appendChild(pokemon);
}