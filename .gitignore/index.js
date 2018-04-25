const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = ".";
const queue = new Map();
const EVERYONE = "@";

var client = new Discord.Client();

var bot = new Discord.Client();

var servers = {};

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

bot.on("ready", function () {
    bot.user.setGame("TexasBOT V1 - .help |")
    bot.user.setUsername("TexasBOT - V1")
    console.log("TexasBOT V1 - Connecté");
});

bot.on('message', function(message) {

        if(message.content === 'Salut') {
            message.reply('Bonjour')
        }

        if(message.content === 'Hi') {
            message.reply('Hello !')
        }

        if(message.content === 'hi') {
            message.reply('Hello !')
        }

        if(message.content === 'salut') {
            message.reply('Bonjour')
        }

        if(message.content === 'Ilian') {
            message.channel.sendMessage("On ne juge mon **développeur **! :o")
        }

        if(message.content === 'ilian') {
            message.reply('We do not judge my ** developer **! : o')
        }

        if(message.content === 'Ilian') {
            message.reply('We do not judge my ** developer **! : o')
        }

        if(message.content === 'ilian') {
            message.channel.sendMessage("On ne juge mon **développeur** ! :o")
        }

        if(message.content === 'ça va') {
            message.channel.sendMessage("Je vais toujours bien, je suis un robot!")
        }
            
        if(message.content === 'How are you') {
            message.channel.sendMessage("I'm always fine, I'm a robot!")
        }

        if(message.content === 'how are you ?') {
            message.channel.sendMessage("Je vais toujours bien, je suis un robot!")
        }

        if(message.content === 'Ça va') {
            message.channel.sendMessage("Je vais toujours bien, je suis un robot!")
        }

        if(message.content === 'Qui est la') {
            message.channel.sendMessage("MOIII")
        }

        if(message.content === 'Who are here') {
            message.channel.sendMessage("MEEE")
        }

        if(message.content === 'who are here') {
            message.channel.sendMessage("MEEE")
        }

        if(message.content === 'Bye') {
            message.channel.sendMessage('À Bientôt ! ^^')
        
        }

        if(message.content === '𝓶𝓪𝓼𝓽𝓮𝓻𝓵𝓸𝓹𝓪𝓷𝓰_𝓛𝓘𝓑𝓔𝓡𝓣𝓨') {
            message.channel.sendMessage('I know, he is the best !')
        }
        
        if(message.content === 'master') {
            message.channel.sendMessage('I know, he is the best !')
        }

        if(message.content === 'bye') {
            message.channel.sendMessage('Goodbye ! ^^')
        }

        if(message.content === 'Bye') {
            message.channel.sendMessage('Goodbye ! ^^')
        }

        if(message.content === 'bye') {
            message.channel.sendMessage('À Bientôt ! ^^')
        }

        if(message.content === 'wsh') {
            message.channel.sendMessage('wshh frr')
        }
    
        if(message.content === 'Wsh') {
            message.channel.sendMessage('wshh frr')
        }
    
        if(message.content === 'Ta mère la grosse pute') {
            message.reply('Surveille ton language jeune insolents !')
            message.delete()
        }
    
    
    });

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name","welcome_channel").sendMessage(member.toString() + " Welcome to the discord of **𝓶𝓪𝓼𝓽𝓮𝓻𝓵𝓸𝓹𝓪𝓷𝓰_𝓛𝓘𝓑𝓔𝓡𝓣𝓨** ! :white_check_mark:");
    member.addRole(member.guild.roles.find("name", "Guest"));
});

bot.on("guildMemberRemove", function(member) {
     member.guild.channels.find("name", "welcome_channel").sendMessage(member.toString() + " Bye bye!" + member.toString() + " :x:");
});


bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;

    var roleJoueur= member.guild.roles.find("name", "Guest")
    
    var roleMute = member.guild.roles.find("name", "Mute")
    
    var modlog = member.guild.channels.find("name", "log_channel")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "play":
            if (!args[1]) {
             message.channel.sendMessage("[TexasBOT Musique] - You must put a link.");   
             return;
            }
            if(!message.member.voiceChannel) {
             message.channel.sendMessage("[TexasBOT Musique] - You must be in a voice channel.");   
             return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
      
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
            });
        break;    
      
        case "skip":
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[TexasBOT Musique] - You must be in a voice channel.");   
             return;
            }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
        break;    
      
        case "stop":
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[TexasBOT Musique] - You must be in a voice channel.");   
             return;
            }
             const serverQueue = queue.get(message.guild.id);
             var server = servers[message.guild.id];
             if (!serverQueue) return message.channel.send("[TexasBOT Musique] - No music is played, so I can not execute this command. ❌")
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
     
        break;    
        case "members":
            message.reply("We are " + bot.users.size + " members on this server !");
        break
        case "unmute":
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("You can't execute this command. ❌");
        if(!modlog) return message.reply("I can not find a channel log.");
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("To whom I withdraw the penalty: MUTE ?")
        member.removeRole(roleMute)
        message.channel.sendMessage(user.toString() + " has been mute ✅")
        
        var embed = new Discord.RichEmbed()
        .addField("Command :", "UNMUTE")
        .addField("Members :", user.username)
        .addField("Moderator :", message.author.username)
        .addField("Hour:", message.channel.createdAt)
        .setColor("#3333cc")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "bot_commands").sendEmbed(embed);
        break;
        case "mute":
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("You can't execute this command. :x:");
        if(!modlog) return message.reply("I can not find a channel log.");  
        if (!reasontimed) return message.reply("You lost the raison ! :D")
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("To whom I must put the penalty: MUTE")
        message.channel.sendMessage(member.toString() + " has been mute. ✅")
        member.addRole(roleMute)

        var embed = new Discord.RichEmbed()
        .addField("Action :", "Mute")
        .addField("Members :", user.toString())
        .addField("Moderator :", message.author.toString())
        .addField("Reason :", reasontimed)
        .setColor("#FFFF00")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "log_channel").sendEmbed(embed);
        break;
        case "shelp":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("You can't execute this command. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
        var embed = new Discord.RichEmbed()
            .addField(".ban", "This command allows you to ban a user ! To use it, make .ban @(user) + (reason)")
            .addField(".kick", "This command allows to kick a user!  To use it, make .kick @(user) + (reason)")
             .addField(".purge", "This command allows you to delete messages much faster ! To use it, make .purge (nomberofmessages)")
             .addField(".mute", "This command is used to transfer a user for a certain time. To use it, make .mute @(user) + (reason)")
             .addField(".web", "For write a message in #announcements with me and with a beautiful style !")
             .addField(".unmute", "This command allows unmute a user. To use it, make .unmute @(user)")
            .setColor("#cc0000")
            .setFooter("Staff help.")
            .setAuthor("Staff Help Panel")
            .setDescription("Here are the command of the staff !")
            .setTimestamp()
            message.delete()
            message.channel.sendEmbed(embed)
        break;    
        
        case "help":
            var embed = new Discord.RichEmbed()
                 .addField(".ping", "Thanks to this command, you will be able to know your ping !") 
                 .addField(".play", "Play a music! To use it, make .play (link) !")
                 .addField(".skip", "Skipping a music To use it, make .skip !")
                 .addField(".stop", "Stop the music To use it, make .stop !")
                 .addField(".translatehelp", "With this you can see the translate pannel :) Just for help you with the translate command !")
                 .addField(".google", "Order not too useful but you can do google search. To use it, make .google (search) !")
                 .addField(".shelp", "❌View the command of the staff. But only those who have the kick perm can access it. ❌")
                .setColor("#0000ff")
                .setFooter("Command idea? Suggest in DM!")
                .setAuthor("Help Panel")
                .setDescription("Here are the bot commands !")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)
            break;
        case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("You do not have permission to execute the command. :x:");
            if(!modlog) return message.reply("I can not find a channel log.");
            if (reason.length < 1) return message.reply("You forgot the reason ! :D");
            if (message.mentions.users.size < 1) return message.reply("You did not put his pseudo in full ! :o")
            message.guild.member(user).kick();
            message.channel.send(user.toString() + " was kick ✅")

            var embed = new Discord.RichEmbed()
            .addField("Command :", "KICK")
            .addField("User :", user.username)
            .addField("Moderator :", message.author.username)
            .addField("Reason : ", reason)
            .addField("Hour:", message.channel.createdAt)
            .setColor("#99ff33")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "bot_commands").sendEmbed(embed);
            bot.channels.get('438671591648526336').sendMessage(":white_check_mark: The user " + user.username + " have been well kicked for: " + reason);
       
            message.delete();
            break;
        case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("You can't execute this command.");
            if(!modlog) return message.reply("I can not find a channel log.");
            if (reason.length < 1) return message.reply("You forgot the reason.");
            if (message.mentions.users.size < 1) return message.reply("You forgot to specify who I should ban..")
            
            message.guild.ban(user, 2);
            message.channel.send(user.toString() + " has been banned ✅")

            var embed = new Discord.RichEmbed()
            .addField("Command :", "BAN")
            .addField("User :", user.username)
            .addField("Moderator :", message.author.username)
            .addField("Reason : ", reason)
            .addField("Hour:", message.channel.createdAt)
            .setColor("#ff9933")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "log_channel").sendEmbed(embed);
            
            bot.channels.get('438671591648526336').sendMessage(":white_check_mark: The user " + user.username + " have been well banned for: " + reason);
            
            message.delete();
            break;
        case "purge":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("You can't execute this command. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
            .addField("Command :", "Purge")
            .addField("Moderator :", message.author.username)
            .addField("Deleted message", messagecount)
            .addField("Hour:", message.channel.createdAt)
            .setColor("#009999")
            .setFooter("Phew! It did a good job in the server ! ^^")
            message.delete()
            member.guild.channels.find("name", "log_channel").sendEmbed(embed);
            break;

       case "ping":
        message.channel.sendMessage("Pong! You have `" + bot.ping + " ms !` :D");
        message.delete();
        break; 
            
       case "google":
        let glg = message.content.split(' ');
        glg.shift();
        console.log("J'ai rechercher!");
        message.reply('https://www.google.fr/#q=' + glg.join('%20'));
        break;

       case "web":
       if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("You can't execute this command. ❌");
          var messagecount = parseInt(args2.join(" "));
          message.channel.fetchMessages({
              limit: messagecount
          }).then(messages => message.channel.bulkDelete(messagecount));
                      message.delete()
     let newi = message.content.split(" ");
     newi.shift();
   var embed = new Discord.RichEmbed()
   .addField("Announcements !", " "+ newi.join(" "))
   .setColor("#FFFB00")
   .setFooter("By Ilian ! ^^")
   message.delete();
   member.guild.channels.find("name", "announcements").sendEmbed(embed);
   break;      

       case "tradenfr":
        let tradenfr = message.content.split(' ');
        tradenfr.shift();
        console.log("Traduction Anglais ==> Français");
        message.reply('https://translate.google.fr/#en/fr/' + tradenfr.join('%20'));
        break;
      
        case "tradfren":
         let tradfren = message.content.split(' ');
         tradfren.shift();
         console.log("Traduction Français ==> Anglais");
         message.reply('https://translate.google.fr/#fr/en/' + tradfren.join('%20'));
         break;
      
        case "tradesfr":
         let tradesfr = message.content.split(' ');
         tradesfr.shift();
         console.log("Traduction Espagnol ==> Français");
         message.reply('https://translate.google.fr/#es/fr/' + tradesfr.join('%20'));
         break;
      
        case "tradfres":
         let tradfres = message.content.split(' ');
         tradfres.shift();
         console.log("Traduction Français ==> Espagnol");
         message.reply('https://translate.google.fr/#fr/es/' + tradfres.join('%20'));
         break;   
      
         case "translatehelp":
         var embed = new Discord.RichEmbed()
              .addField(".tradenfr", "Translate English ==> French !") 
              .addField(".tradfren", "Translate French ==> English !")
              .addField(".tradesfr", "Translate Spanish ==> French !")
              .addField(".tradfres", "Taduction French ==> Spanish !")
             .setColor("#00ffcc")
             .setFooter("Have fun translating little child !")
             .setAuthor("Translate Help Pannel")
             .setDescription("This is so very fun !")
             .setTimestamp()
             message.delete()
             message.channel.sendEmbed(embed)
         break; 

        default:
            message.channel.sendMessage("Invalid command ^^ Done .help to see all available commands !")
            message.delete();
    }
});

bot.login('NDM4NDI4NTEwMTMxMDYwNzQ2.DcISKQ.eSr5yBwsK0bQfJV2B4YKVc01w_s');
