const labelTicket1 = document.querySelector('#labelTicket1')
const labelTicket2 = document.querySelector('#labelTicket2')
const labelTicket3 = document.querySelector('#labelTicket3')
const labelTicket4 = document.querySelector('#labelTicket4')
const labelDesktop1 = document.querySelector('#labelDesktop1')
const labelDesktop2 = document.querySelector('#labelDesktop2')
const labelDesktop3 = document.querySelector('#labelDesktop3')
const labelDesktop4 = document.querySelector('#labelDesktop4')
const clientSocket = io()

const showTicket = (ticketToShow, labelTicket, labelDesktop) => {
  if (ticketToShow != null) {
    labelTicket.textContent = `Ticket: ${ticketToShow.number}`
    labelDesktop.textContent = `Escritorio: ${ticketToShow.desktop}`
  } else {
    labelTicket.textContent = 'No hay ticket en cola'
    labelDesktop.textContent = ''
  }
}

clientSocket.on('ticket-attended-notification', () => {
   const notificationAudio = new Audio('../audio/new-ticket.mp3')
   notificationAudio.play()
 })

clientSocket.on('show-last-tickets', lastFourTickets => {
  showTicket(lastFourTickets[0], labelTicket1, labelDesktop1)
  showTicket(lastFourTickets[1], labelTicket2, labelDesktop2)
  showTicket(lastFourTickets[2], labelTicket3, labelDesktop3)
  showTicket(lastFourTickets[3], labelTicket4, labelDesktop4)
})
