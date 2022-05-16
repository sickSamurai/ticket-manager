require('dotenv').config()

const Server = require('./models/server')

const server = new Server()

server.sockets()
server.routes()
server.middlewares()
server.listen()
