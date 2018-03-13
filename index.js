const Discord = require('discord.js');
const bot = new Discord.Client();
const sql = require('sqlite');
sql.open('./score.sqlite');
const bank = "!bank";

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
  
  if(message.content.startsWith(bank)) {
    var comm = message.content.slice(1).split(/ +/g);
    switch (comm[1]) {
      case 'bal':    
    }
    
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) {
        sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
      } else {
      
      let curLevel = Math.floor(row.points/10);
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS artBank (userId TEXT, type TEXT, level INTEGER, quantity INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  //if (!message.content.startsWith(prefix)) return;
/*
  if (message.content.startsWith(prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Your current level is 0");
      message.reply(`Your current level is ${row.level}`);
    });
  } else

  if (message.content.startsWith(prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet!");
      message.reply(`you currently have ${row.points} points, good going!`);
    });
  }
*/      
/*
    if(message.member.roles.some(r=>["Dev", "Mod", "Server Staff", "Proficient"].includes(r.name)) ) {
      message.channel.send(message.author.username+' has role *Lunatic Prime*');
    } else {
      message.channel.send(message.author.username+' does not have correct role.');
    }
*/
    let primeR = message.guild.roles.get(process.env.lPrime);
    //if(message.member.roles.has(primeR.id)) {message.channel.send(message.author.username+' has role'+primeR);}
    var args = message.content.slice(1).split(/ +/g);
    message.channel.send('The Galactic Bank does not understand your command \'*'+args[1]+'*\'.');
    return;
  }

  if(message.content.startsWith('!')) {
    message.channel.send('\`'+message.content+'\` is not a currently recognized command.');
  }
  
});

bot.login(process.env.DISCORD_BOT_TOKEN);
