const fs = require('fs')

const content = fs.readFileSync('files/sampe-text.md', 'utf-8')
const wordArray = content.split(' ')

const reactArray = wordArray.filter((word)=>word.toUpperCase().includes('REACT'))

console.log('World count is ', reactArray.length);







