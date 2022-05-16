const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl()

const socketController = socket => {
  socket.emit('show-last-tickets', ticketControl.lastFourTickets)

  socket.emit('last-ticket-sending', ticketControl.lastTicket)

  socket.on('ticket-generation', () => {
    const nextTicket = ticketControl.generateTicket()
    socket.emit('ticket-generation', nextTicket)
    socket.broadcast.emit('pending-tickets-sending', ticketControl.pendingTickets)
  })

  socket.emit('pending-tickets-sending', ticketControl.pendingTickets)

  socket.on('attend-ticket', ({ desktop }) => {
    const ticketAttended = ticketControl.attendTicket(desktop)
    if (ticketAttended === null) socket.emit('no-tickets-to-attend')
    else {
      socket.emit('attending-ticket', ticketAttended)

      socket.emit('pending-tickets-sending', ticketControl.pendingTickets)
      socket.broadcast.emit('pending-tickets-sending', ticketControl.pendingTickets)

      socket.broadcast.emit('show-last-tickets', ticketControl.lastFourTickets)

      socket.broadcast.emit('ticket-attended-notification')
    }
  })
}

module.exports = {
  socketController
}
