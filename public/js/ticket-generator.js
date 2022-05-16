const buttonGenerateTicket = document.querySelector('#buttonGenerateTicket')
const labelNewTicket = document.querySelector('#labelNewTicket')

const socketClient = io()

socketClient.on('connected', () => buttonGenerateTicket.removeAttribute('disabled'))
socketClient.on('disconnected', () => buttonGenerateTicket.setAttribute('disabled', 'disabled'))

buttonGenerateTicket.addEventListener('click', () => {
  socketClient.emit('ticket-generation')
})

const showTicket = ticket => {
  if (ticket === 0) labelNewTicket.textContent = `No se han creado tickets`
  else labelNewTicket.textContent = `El ultimo ticket es: ${ticket}`
}

socketClient.on('last-ticket-sending', showTicket)

socketClient.on('ticket-generation', showTicket)
