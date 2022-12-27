const SENHA = '1235';
let userInputSENHA = prompt('Insira a senha...');
while (userInputSENHA !== SENHA) {
    userInputSENHA = prompt('Senha inválida. Tente novamente...');
}
console.log('Senha validada com sucesso!')