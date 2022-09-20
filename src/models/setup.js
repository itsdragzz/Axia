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
    ReportChannelID: String,
    Designs: Boolean
    
});

const MessageModel = module.exports = mongoose.model('Setup', SetupSchema );