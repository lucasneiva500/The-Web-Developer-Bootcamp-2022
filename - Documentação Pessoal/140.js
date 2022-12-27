console.log('olá primeiro arquivo com javascript');
let teste_1 = 1 + 3;
if (1 + 1 === 2) {
    console.log('V') //teste 1 do operador "if", true
}
if (1 + 1 === 3) {
    console.log('F') //teste 2 do operador "if", false
}
let random_1 = Math.random();
console.log(`o valor de random_1 é de ${random_1}`);
if (random_1 <= 0.5) {
    console.log('random_1 menor ou igual a 0.5') //teste 3 do operador "if"
} else {
    console.log('random_1 maior que 0.5') // teste 3 do operador "if"
}
let parouimpar_1 = (Math.floor(Math.random() * 10) + 1);
if ((parouimpar_1 % 2) === 0) {
    console.log(`o número ${parouimpar_1} é par`);
} else if (1 === (parouimpar_1 % 2)) {
    console.log(`o número ${parouimpar_1} é ímpar`);
}
