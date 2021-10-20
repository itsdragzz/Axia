const {
    Client,
    Collection,
} = require('discord.js');
const EventHandler = require("./utils/loadEvents"); //holds event handlers
const config = require('../config.json');

module.exports = class ClientManager extends Client {
    constructor(options) { //constructor 
        super(options);
        this.commands = new Collection(); //command collection
        this.aliases = new Collection(); //aliases collection
    }
    //this = client

    setup() {
        this.events = new EventHandler(this);
        this.events.init(); 

        require('./utils/loadCommands')(this); //requring "loadCommands" file

        this.login(config.token);
    }
};