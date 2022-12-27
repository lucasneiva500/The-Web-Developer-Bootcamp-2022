const bcrypt = require('bcrypt');

// função gerando o salt e depois adicionando ao hash
// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

// função gerando o salt já adicionando o hash
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)
    if (result) {
        console.log('Logged in successfully!')
    } else {
        console.log('Incorrect password... try again.')
    }
}

// hashPassword('monkey');
login('monkey', '$2b$12$ZT/xnr34MzHZD0y9NB4/ye7td0M6JbOC99uygj87Rv02mQYqAPQJ2')