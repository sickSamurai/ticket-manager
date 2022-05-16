const express = require('express')
const cors = require('cors')

const { socketController } = require('../controllers/socket-controller')

class Server {
  constructor() {
    this.app = express()
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)
    this.port = process.env.PORT
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Directorio Público
    this.app.use(express.static('public'))
  }

  routes() {
    // this.app.use( this.paths.auth, require('../routes/auth'));
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
