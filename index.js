const Discord = require('discord.js');
const bot = new Discord.Client();
//const sql = require('sqlite');
//sql.open('./score.sqlite');
//const prefix = "+";

bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('message',(message) => {
  if (message.author.bot) return; // Ignore bots.
  if (message.channel.type === "dm") {//return; // Ignore DM channels.
      message.channel.send('I\'m not setup for DMs yet...');
  }
  //if(message.content.startsWith('!')) {
  if(message.content == '!test') {
    message.channel.send(
      '\`Hal is online and responding.\`'
    );
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
