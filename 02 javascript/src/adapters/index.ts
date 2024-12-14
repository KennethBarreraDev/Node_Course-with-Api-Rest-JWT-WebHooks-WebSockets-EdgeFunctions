const {getAge} = require('../adapters/get-age.dapater')
const { generateId } = require('../adapters/uuid.adapter')
const { httpClientPlugin } = require('../adapters/fetch.dapaters')
const {buildLogger} = require('../adapters/logger.adaper')

module.exports = {
    getAge, 
    generateId,
    httpClientPlugin,
    buildLogger
}