## Introduction
Axia is a multi-utility bot that contains many useful commands and management systems! This bot is well known for its use of customizable `suggestion` command. Also, it's online 24/7 (other than small downtime). Furthermore, has 20+ useful commands for you and your server and it's being updated every week!
  
### Getting started
Start by running the `setup` command, the command will lead you to setup your suggest channel, report channel and mute role. For more help run the help command or join our support server.

### List of commands
Most of the commands are listed here
 * Default bot permission are SEND_MESSAGES and VIEW_CHANNEL
 * Args labeled with ^ are optional
 * Use the command 'deletedata' if you want to delete your data from my database
 
Command | Information | Args | Aliases | Bot Permissions
------------ | ------------- | ------------- | ------------- | -------------
8ball | Answers the question, you provide | \<question> | none | SEND_MESSAGES
image | Displays a image must be in a nsfw channel | \<search> | none | SEND_MESSAGES
embed | Embeds any message that you send | \<message> | say | SEND_MESSAGES
weather | Tells you the weather of a location | \<location> (city) | non | SEND_MESSAGES
calculate | Calculates your math question | \<equation> | cal | SEND_MESSAGES
meme | Sends a random meme from a subreddit | none | none | SEND_MESSAGES
slowmode | Slowmode for a a certain time | \<secs> | none | MANAGE_CHANNELS
kick | Removes a member from the server | \<member mention>| none | KICK_MEMBERS
ban | Bans a member from the server | \<member mention>| none | BAN_MEMBERS
unban | Unbans a member from the server | \<member id> | none | BAN_MEMBERS
warn | Warns a member from the server | \<member mention>| none | SEND_MESSAGES
warns | Checks the warns for a user | \<member mention> | none | SEND_MESSAGES
mute | Mutes a member from the server | \<member mention> | shutup | MANAGE_ROLES
unmute | Unmutes a member from the server | \<member mention> | unshutup | MANAGE_ROLES
invite | Command currently being worked on  | none | none | SEND_MESSAGES
ping | Displays the ping or api lag I am getting | none | none | SEND_MESSAGES
whois | Shows relevant information for the member | \<member mention> | userinfo | SEND_MESSAGES
serverinfo | Shows relevant information for the server | none | none | SEND_MESSAGES
botinfo | Shows information about the bot | none | none | SEND_MESSAGES
suggest | A simple suggest command | \<channel (1 time only)> \<suggestion> | none | SEND_MESSAGES
trivia | Shows a trivia question for you to answer | none | triv | SEND_MESSAGES
rps | Play a game of rock paper scissors | \^\<rock> \^\<sissors> \^\<paper>| none | SEND_MESSAGES


# Privacy Policy
By using Axia, you agree to the following privacy policy.

Axia collects user and guild IDS for our database, which we store until a user requests for the data to be deleted via the ',deletedata' command or they can email me via ecdragonzz@gmail.com
We collect data for our moderation command and utility commands. No one has access to our database, other then the owner's account which is protected with 2FA 
and a password consisting of over 20 characters. We use mongodb as our database and Heroku as our host provider. If you have any concerns about the bot please don't hesitate to dm me or email me. 

## Commands that use our database
Command | How to delete data  | How we store data
------------ | ------------- | ------------- 
warn | remove warn or deletedata | when you warn a user, it stores the warn as a array
suggest | deletedata | stores the guild id and the channel id
report | deletedata | stores the guild id and the channel id 

Note: We reserve the right to change this without notifying our users.
This policy was last updated September 28th, 2020.
Thanks for using our discord bot, Axia

