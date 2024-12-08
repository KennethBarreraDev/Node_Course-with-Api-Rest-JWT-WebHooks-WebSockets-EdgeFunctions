const fs = require('fs')

const data = fs.readFileSync('files/sampe-text.md', 'utf-8')

console.log('data is');
const replacedText = data.replace('React', 'Angular')

fs.writeFileSync('files/probe.md', replacedText)

console.log('File has been written');



