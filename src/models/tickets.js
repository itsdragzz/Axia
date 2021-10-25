const mongoose = require('mongoose');


let ticketsSchema = new mongoose.Schema({
    GuildID: String,
    TicketID: String,
});

const MessageModel = module.exports = mongoose.model('tickets', ticketsSchema );