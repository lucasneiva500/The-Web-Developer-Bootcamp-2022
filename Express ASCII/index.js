const figlet = require('figlet');
const colors = require('colors');
const args = process.argv.slice(2);

figlet(args, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data.green)
});

// no lugar de args, se for escrever alguma coisa usar 2 ou 3 espaços entre as palavras
// em data.red, é possível alterar as cores