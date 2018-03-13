const Discord = require('discord.js');
const bot = new Discord.Client();
//const sql = require('sqlite');
//sql.open('./score.sqlite');
//const prefix = "+";

bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('message',(message) => {
  if(message.author.bot) return; // Ignore bots.
  if(message.channel.type === "dm") {//return; // Ignore DM channels.
    message.channel.send('I\'m not setup for DMs yet...');
    return;
  }

  if(message.content == '!test') {
    message.channel.send('\`Hal is online and responding.\`');
    return;
  }
  
  if(message.content.startsWith('!')) {
    //message.channel.send('Your name is: '+message.author.username);
 /*
    if(message.member.roles.some(r=>["Dev", "Mod", "Server Staff", "Proficient"].includes(r.name)) ) {
      message.channel.send(message.author.username+' has role *Lunatic Prime*');
    } else {
      message.channel.send(message.author.username+' does not have correct role.');
    }
*/
    let primeR = message.guild.roles.get(process.env.lPrime);
    if(message.member.roles.has(primeR.id)) {message.channel.send(message.author.username+' has role'+primeR);}
}
});

bot.login(process.env.DISCORD_BOT_TOKEN);
