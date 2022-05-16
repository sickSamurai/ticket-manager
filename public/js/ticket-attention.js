const labelDesktop = document.querySelector('#labelDesktop')
const labelTicket = document.querySelector('#labelTicket')
const buttonAttendNextTicket = document.querySelector('#buttonAttendNextTicket')
const alertContainer = document.querySelector('#alertContainer')
const labelPendingTickets = document.querySelector('#labelPendingTickets')

const clientSocket = io()

const searchParameters = new URLSearchParams(window.location.search)
if (searchParameters.has('desktop') == false) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

const desktop = searchParameters.get('desktop')
labelDesktop.textContent = `Escritorio: ${desktop}`
alertContainer.style.display = 'none'

buttonAttendNextTicket.addEventListener('click', () => {
  clientSocket.emit('attend-ticket', { desktop })
})

clientSocket.on('attending-ticket', ticketAttended => {
  labelTicket.textContent = ticketAttended.number
})

clientSocket.on('pending-tickets-sending', pendingTickets => {
  if (pendingTickets === 0) alertThereNotTickets()
  else labelPendingTickets.textContent = pendingTickets
})

clientSocket.on('no-tickets-to-attend', () => alertThereNotTickets())

alertThereNotTickets = () => {
  alertContainer.style.display = ''
  labelPendingTickets.textContent = ''
}
