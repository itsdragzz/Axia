const mongoose = require('mongoose');


/**
 * @public
 */

let SetupSchema = new mongoose.Schema({
    GuildID: String,
    StaffRoleID: String,
    MuteRoleID: String,
    BlackListRoleID: String,
    SuggestChannelID: String,
    ReportChannelID: String
    
});

const MessageModel = module.exports = mongoose.model('Setup', SetupSchema );