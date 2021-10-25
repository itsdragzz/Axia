const mongoose = require('mongoose');


let PunishmentsSchema = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Punishments: Array
});

const MessageModel = module.exports = mongoose.model('Punishments', PunishmentsSchema );