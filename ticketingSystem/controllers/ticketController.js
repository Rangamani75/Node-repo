const { readTickets, writeTickets } = require("../models/ticketModel");

function getAllTickets(req, res) {
  const tickets = readTickets();
  res.json(tickets);
}

function getTicketById(req, res) {
  const { id } = req.params;
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === +id);
  ticket ? res.json(ticket) : res.status(404).json({ error: "Ticket not found" });
}

function createTicket(req, res) {
  const { title, description, priority, user } = req.body;
  const tickets = readTickets();
  const newTicket = {
    id: Date.now(),
    title,
    description,
    priority,
    user,
    status: "pending"
  };
  tickets.push(newTicket);
  writeTickets(tickets);
  res.status(201).json(newTicket);
}

function updateTicket(req, res) {
  const { id } = req.params;
  const { title, description, priority } = req.body;
  const tickets = readTickets();
  const idx = tickets.findIndex(t => t.id === +id);
  if (idx === -1) return res.status(404).json({ error: "Ticket not found" });

  tickets[idx] = { ...tickets[idx], title, description, priority };
  writeTickets(tickets);
  res.json(tickets[idx]);
}

function deleteTicket(req, res) {
  const { id } = req.params;
  const tickets = readTickets();
  const updated = tickets.filter(t => t.id !== +id);
  if (updated.length === tickets.length) return res.status(404).json({ error: "Ticket not found" });

  writeTickets(updated);
  res.json({ message: "Ticket deleted successfully" });
}

function resolveTicket(req, res) {
  const { id } = req.params;
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === +id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.status = "resolved";
  writeTickets(tickets);
  res.json(ticket);
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket,
};