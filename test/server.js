/**
 * @description jest server
 * @author afang
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)