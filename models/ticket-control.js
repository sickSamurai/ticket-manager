const path = require('path')
const fileSystem = require('fs')
const Ticket = require('../models/ticket')

const dbPath = path.join(__dirname, '../database/data.json')

class TicketControl {
  constructor() {
    this.tickets = []
    this.lastFourTickets = []
    this.lastTicket = 0
    this.todayDate = new Date().getDate()
    this.init()
  }

  get pendingTickets() {
    return this.tickets.length
  }

  get toJson() {
    return {
      tickets: this.tickets,
      lastFourTickets: this.lastFourTickets,
      lastTicket: this.lastTicket,
      todayDate: this.todayDate
    }
  }

  saveToDB = () => fileSystem.writeFileSync(dbPath, JSON.stringify(this.toJson))

  init() {
    const databaseContent = fileSystem.readFileSync(dbPath).toString()
    if (databaseContent == '') this.saveToDB()
    else {
      const { tickets, lastTicket, lastFourTickets, todayDate } = JSON.parse(databaseContent)
      if (todayDate == this.todayDate) {
        this.tickets = tickets
        this.lastFourTickets = lastFourTickets
        this.lastTicket = lastTicket
      } else this.saveToDB()
    }
  }

  generateTicket() {
    this.lastTicket += 1
    this.tickets.push(new Ticket(this.lastTicket, null))
    this.saveToDB()
    return this.lastTicket
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) return null
    const ticket = this.tickets.shift()
    ticket.desktop = desktop
    this.lastFourTickets.unshift(ticket)
    if (this.lastFourTickets.length > 4) this.lastFourTickets.splice(-1, 1)
    this.saveToDB()
    return ticket
  }
}

module.exports = TicketControl
