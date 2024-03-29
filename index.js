const ClientManager = require('./src/ClientManager');
const client = new ClientManager({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: 32767, //enable all intents 
    disableMentions: 'everyone',
});

const config = require('./config.json');
const mongoose = require('mongoose');



mongoose.connect(`${config.mongoose}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) //conntect mongoose 
 
client.setup(); 