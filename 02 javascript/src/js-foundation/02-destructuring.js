
const {PORT, USERDOMAIN} = process.env

console.log(PORT ?? 3000);
console.log(USERDOMAIN);

const characters = ['flash', 'superman', 'batman']

const [_, __, batman] = characters

console.log(batman);

