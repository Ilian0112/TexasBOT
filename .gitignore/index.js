const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = ":";
const queue = new Map();
const EVERYONE = "@";

var client = new Discord.Client();

var bot = new Discord.Client();

var version = "V.0.1.9"

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
    bot.user.setActivity("TexasBOT - " + PREFIX + "help |")
    bot.user.setUsername("TexasBOT")
    console.log("TexasBOT - Connected");
});

/*bot.on('message', function(message) {
    });*/

bot.on("guildMemberAdd", function(member) {
    var join_embed = new Discord.RichEmbed()
        .setAuthor("Member Joined :", mesagge.user.avatarURL)
        .setTitle("Welcome " + message.user.username + " on " + message.guild.name + " ! :white_check_mark:")
        .setColor("#77FF00")
        .setTimestamp()
    member.guild.channels.find("name","welcome_channel").send(join_embed);
    member.addRole(member.guild.roles.find("name", "Guest"));
});

bot.on("guildMemberRemove", function(member) {
    var left_embed = new Discord.RichEmbed()
        .setAuthor("Member Left :", mesagge.user.avatarURL)
        .setTitle("Bye Bye " + message.user.username + " ! 😢 ")
        .setColor("#FF3C00")
        .setTimestamp()
    member.guild.channels.find("name", "welcome_channel").send(left_embed)
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

    var footheren = "Request by @" + message.author.username + "#" + message.author.discriminator + " ! | TexasBOT - " + version

    var foother = "Demande de @" + message.author.username + "#" + message.author.discriminator + " ! | TexasBOT - " + version

    var roleGuest = member.guild.roles.find("name", "Guest")
    
    var roleMute = member.guild.roles.find("name", "Muted")
    
    var modlog = member.guild.channels.find("name", "log_channel")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "play":
            if (!args[1]) {
                message.channel.send("[``TexasBOT Music``] - You must put a link.");   
                return;
            }
            if(!message.member.voiceChannel) {
                message.channel.send("[``TexasBOT Music``] - You must be in a voice channel.");   
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
                message.channel.send("[``TexasBOT Music``] - You must be in a voice channel.");   
                return;
            }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
        break;    
      
        case "stop":
            if(!message.member.voiceChannel) {
                message.channel.send("[``TexasBOT Music``] - You must be in a voice channel.");   
                return;
            }
            const serverQueue = queue.get(message.guild.id);
            var server = servers[message.guild.id];
            if (!serverQueue) return message.channel.send("[``TexasBOT Music``] - No music is played, so I can not execute this command. ❌")
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

        case "unmute":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't execute this command. ❌");
            if(!modlog) return message.reply("I can not find a channel log.");
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("To whom I withdraw the penalty: ``Mute`` ?")
            member.removeRole(roleMute)
            message.channel.send(user.toString() + " has been unmuted ✅")
            
            var unmute_embed = new Discord.RichEmbed()
                    .addField("Command :", "UnMute")
                    .addField("Members :", user.username)
                    .addField("Moderator :", message.author.username)
                    .addField("Hour:", message.channel.createdAt)
                .setColor("#3333cc")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log_channel").send(unmute_embed);
        break;

        case "mute":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't execute this command. :x:");
            if(!modlog) return message.reply("I can not find a channel log.");  
            if (!reasontimed) return message.reply("You lost the raison ! :D")
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("To whom I must put the penalty: ``Mute``")
            message.channel.send(member.toString() + " has been muted. ✅")
            member.addRole(roleMute)

            var mute_embed = new Discord.RichEmbed()
                    .addField("Action :", "Mute")
                    .addField("Members :", user.toString())
                    .addField("Moderator :", message.author.toString())
                    .addField("Reason :", reasontimed)
                .setColor("#FFFF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log_channel").send(mute_embed);
        break;

        case "shelp":
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
        message.delete()
        var language_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
            .setColor("#36393E")
            .setFooter(foother + "/" + footheren)
        var startfr_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Menu d'aide🇫🇷🛠 !")
            .setDescription("**Pour naviguer dans le menu d'aide du staff, utilisez les réactions si-dessous.**")
            .setColor("#36393E")
            .setFooter(foother)
        var shelp1fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷Commande qui demande au moins le modo ( sauf pour le kick )🇫🇷")
            .setColor("#cc0000")
                .addField(PREFIX + "purge", "Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites " + PREFIX + "purge (nombredemessages)")
                .addField(PREFIX + "mute", "Cette commande permet de muté un utilisateur pendant un certain temps. Pour l'utiliser, faites " + PREFIX + "mute @(utilisateur) + (raison)")
                .addField(PREFIX + "unmute", "Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites " + PREFIX + "unmute @(utilisateur)")
            .setFooter("Page 1/3 | " + foother)
        var shelp2fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷Commande d'annonce ( Permission requise : kick )🇫🇷")
                .setColor("#cc0000")
                .addField(PREFIX + "annoucement", "Cette commande permet de faire une annonce avec une embed. **(** __*avec mention everyone*__ **)** l'annonce ce ferra dans le channel ``#annoucement``")
            .setFooter("Page 2/3 | " + foother)                
        var shelp3fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷Commande qui demande au moins l'admin ( sauf pour le kick )🇫🇷")
            .setColor("#cc0000")
                .addField(PREFIX + "kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites " + PREFIX + "kick @(utilisateur) + (raison)")
                .addField(PREFIX + "ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites " + PREFIX + "ban @(utilisateur) + (raison)")
            .setFooter("Page 3/3 | " + foother)
        var starten_embed = new Discord.RichEmbed()
            .setTitle("🛠🇬🇧Help menu🇬🇧🛠 !")
            .setDescription("**To navigate the help menu of the staff, use the reactions below.**")
            .setColor("#36393E")
            .setFooter(footheren)
        var shelp1en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧Command that requires at least the modo (except for the kick)🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "purge", "This command allows you to delete messages much faster! To use it, do " + PREFIX + "purge (number of messages)")
                .addField(PREFIX + "mute", "This command allows to mute a user for a certain time. To use it, do " + PREFIX + "mute @(user) + (reason)")
                .addField(PREFIX + "unmute", "This command allows to unmute a user. To use it, do " + PREFIX + "unmute @(user)")
          .setFooter("Page 1/3 | " + footheren)
        var shelp2en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧Annoucement command (Permission required: kick)🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "annoucement", "This command allows to make an announcement with an embed. **(** __*with mention everyone*__ **)** the announcement will be in the channel ``#annoucement``")
            .setFooter("Page 2/3 | " + footheren)                
        var shelp3en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧Command that requires at least the admin (except for the kick)🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "kick", "This command is used to kick a user ! To use it, do " + PREFIX + "kick @(user) + (reason)")
                .addField(PREFIX + "ban", "This command is used to ban a user ! To use it, do " + PREFIX + "ban @(user) + (reason)")
            .setFooter("Page 3/3 | " + footheren)
        const srhelpmessage = await message.channel.send(language_embed);
        await srhelpmessage.react("🇫🇷");
        await srhelpmessage.react("🇬🇧");
        const repanierr = srhelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        repanierr.on('collect', async(reaction) => {
        if (reaction.emoji.name === "🇫🇷") {
        srhelpmessage.edit(startfr_embed);
        srhelpmessage.clearReactions();
        await srhelpmessage.react("1⃣");
        await srhelpmessage.react("2⃣");
        await srhelpmessage.react("3⃣");
        const theri = srhelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        theri.on('collect', async(reaction) => {
            if (reaction.emoji.name === "1⃣") {
                srhelpmessage.edit(shelp1fr_embed);
            }
            if (reaction.emoji.name === "2⃣") {
                srhelpmessage.edit(shelp2fr_embed);
            }
            if (reaction.emoji.name === "3⃣") {
                srhelpmessage.edit(shelp3fr_embed);
            }
            await reaction.remove(message.author.id);
            })
            }
            if (reaction.emoji.name === "🇬🇧") {
                srhelpmessage.edit(starten_embed);
                srhelpmessage.clearReactions();
                await srhelpmessage.react("1⃣");
                await srhelpmessage.react("2⃣");
                await srhelpmessage.react("3⃣");
                const theriz = srhelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                theriz.on('collect', async(reaction) => {
                if (reaction.emoji.name === "1⃣") {
                    srhelpmessage.edit(shelp1en_embed);
                }
                if (reaction.emoji.name === "2⃣") {
                    srhelpmessage.edit(shelp2en_embed);
                }
                if (reaction.emoji.name === "3⃣") {
                    srhelpmessage.edit(shelp3en_embed);
                }
                await reaction.remove(message.author.id);
                })
            }
        })
        break;   
        
        case "help":
        message.delete()
        var language_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
            .setColor("#36393E")
            .setFooter(foother + "/" + footheren)
        var startfr_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Menu d'aide🇫🇷🛠 !")
                .addField("Si tu a un problème avec les réactions ( qui sont toute enlever ) ajoute les toi même ! ( :one: :two: :three: )", "**Pour naviguer dans le menu d'aide, utilisez les réactions si-dessous.**")
            .setColor("#36393E")
            .setFooter(foother)
        var help1fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷🎵Musique🎵🇫🇷")
            .setColor("#0000ff")
                .addField(PREFIX + "play", "**Jouer une musique** !  Pour l'utiliser, faites *" + PREFIX + "play (lien youtube)* !")
                .addField(PREFIX + "skip", "**Sauter une musique**  Pour l'utiliser, faite *" + PREFIX + "skip* !")
                .addField(PREFIX + "stop", "**Arreter la musique**  Pour l'utiliser, faites *" + PREFIX + "stop* !")
            .setFooter("Page 1/3 | " + foother)
        var help2fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷💩Autre💩🇫🇷")
            .setColor("#0000ff")
                .addField(PREFIX + "botinfo", "**Grâce à cette commande, tu pourras savoir** __**mes info**__ !") 
            .setFooter("Page 2/3 | " + foother)                
        var help3fr_embed = new Discord.RichEmbed()
                .setTitle("🇫🇷⚙Administration🛠🇫🇷")
                .setColor("#cc0000")
                    .addField(PREFIX + "shelp", "❌__**Afficher les commandes du staff. Mais seule ceux qui ont la perm de kick pourrons y accèder**__.❌")
            .setFooter("Page 3/3 | " + foother)
        var starten_embed = new Discord.RichEmbed()
            .setTitle("🛠🇬🇧Help menu🇬🇧🛠 !")
            .addField("If you have a problem with the reactions (which are all removed) add the same yourself ! ( :one: :two: :three: )", "**To navigate the help menu, use the reactions below.**")
            .setColor("#36393E")
            .setFooter(footheren)
        var help1en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧🎵Music🎵🇬🇧")
            .setColor("#0000ff")
                .addField(PREFIX + "play", "**Playing a music** !  To use it, do *" + PREFIX + "play (youtube link)* !")
                .addField(PREFIX + "skip", "**Skip a music** ! To use it, do *" + PREFIX + "skip* !")
                .addField(PREFIX + "stop", "**Stop the music** ! To use it, do *" + PREFIX + "stop* !")
          .setFooter("Page 1/3 | " + footheren)
        var help2en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧💩Other💩🇬🇧")
            .setColor("#0000ff")
                .addField(PREFIX + "botinfo", "**With this command, you will be able to know** __**my information**__ !") 
            .setFooter("Page 2/3 | " + footheren)                
        var help3en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧⚙Administration🛠🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "shelp", "❌__**View the commandes of the staff. But only those who have the kick perm can access it**__.❌")
            .setFooter("Page 3/3 | " + footheren)
        const helpmessage = await message.channel.send(language_embed);
        await helpmessage.react("🇫🇷");
        await helpmessage.react("🇬🇧");
        const loir = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        loir.on('collect', async(reaction) => {
        if (reaction.emoji.name === "🇫🇷") {
        helpmessage.edit(startfr_embed);
        helpmessage.clearReactions();
        await helpmessage.react("1⃣");
        await helpmessage.react("2⃣");
        await helpmessage.react("3⃣");
        const therri = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        therri.on('collect', async(reaction) => {
            if (reaction.emoji.name === "1⃣") {
                helpmessage.edit(help1fr_embed);
            }
            if (reaction.emoji.name === "2⃣") {
                helpmessage.edit(help2fr_embed);
            }
            if (reaction.emoji.name === "3⃣") {
                helpmessage.edit(help3fr_embed);
            }
            await reaction.remove(message.author.id);
            })
            }
            if (reaction.emoji.name === "🇬🇧") {
                helpmessage.edit(starten_embed);
                helpmessage.clearReactions();
                await helpmessage.react("1⃣");
                await helpmessage.react("2⃣");
                await helpmessage.react("3⃣");
                const therir = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                therir.on('collect', async(reaction) => {
                if (reaction.emoji.name === "1⃣") {
                    helpmessage.edit(help1en_embed);
                }
                if (reaction.emoji.name === "2⃣") {
                    helpmessage.edit(help2en_embed);
                }
                if (reaction.emoji.name === "3⃣") {
                    helpmessage.edit(help3en_embed);
                }
                await reaction.remove(message.author.id);
                })
            }
        })
        break;

        case "kick":
                if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to execute the command. :x:");
                if(!modlog) return message.reply("I can not find a channel ``#log_channel``.");
                if (reason.length < 1) return message.reply("You forgot the reason ! :D");
                if (message.mentions.users.size < 1) return message.reply("You did not put his pseudo in full ! :o")
                message.guild.member(user).kick();
                message.channel.send(user.toString() + " was kick ✅")

                var kick_embed = new Discord.RichEmbed()
                    .addField("Command :", "Kick")
                    .addField("User :", user.username)
                    .addField("Moderator :", message.author.username)
                    .addField("Reason : ", reason)
                    .addField("Hour:", message.channel.createdAt)
                .setColor("#99ff33")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
                member.guild.channels.find("name", "bot_commands").send(kick_embed)
        
                message.delete();
            break;

            case "ban":
                if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't execute this command.");
                if(!modlog) return message.reply("I can not find a channel ``#log_channel``.");
                if (reason.length < 1) return message.reply("You forgot the ``reason``.");
                if (message.mentions.users.size < 1) return message.reply("You forgot to specify who I should ``ban``..")
                
                message.guild.ban(user, 2);
                message.channel.send(user.toString() + " has been banned ✅")

                var ban_embed = new Discord.RichEmbed()
                        .addField("Command :", "Ban")
                        .addField("User :", user.username)
                        .addField("Moderator :", message.author.username)
                        .addField("Reason : ", reason)
                        .addField("Hour:", message.channel.createdAt)
                    .setColor("#ff9933")
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setTimestamp()
                member.guild.channels.find("name", "log_channel").send(ban_embed);
                
                message.delete();
            break;

            case "purge":
                if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't execute this command. ❌");
                var messagecount = parseInt(args2.join(" "));
                message.channel.fetchMessages({
                    limit: messagecount
                }).then(messages => message.channel.bulkDelete(messagecount));
                message.delete()
            break;

            case "botinfo":
            var load1_embed = new Discord.RichEmbed()
                .addField(':clock2: Loading.', "Thank you for your patience !")
            message.channel.send(load1_embed).then(message => message.edit(load2_embed)).then(message => message.edit(load3_embed)).then(message => message.edit(load4_embed)).then(message => message.edit(botinfo_embed));
            var load2_embed = new Discord.RichEmbed()
                .addField(':clock2: Loading..', "Thank you for your patience !")  
            var load3_embed = new Discord.RichEmbed()
                .addField(':clock2: Loading...', "Thank you for your patience !")   
            var load4_embed = new Discord.RichEmbed()
                .addField(':clock2: Loading.', "Thank you for your patience !")    
            let startTime = Date.now();
            message.channel.send(ping_embed).then(message => message.edit(botinfo_embed));
            var botinfo_embed = new Discord.RichEmbed()
                .setColor('#04B404')
                .setTitle('My informations :')
                    .addField("Servers :", "I am on " + bot.guilds.array().length + " servers")
                    .addField("Membres :", "I see ``" + bot.users.size + " members`` in total.")
                    .addField("Version :", "The version of my system is : ``" + version + "`` !")
                    .addBlankField()
                    .addField('My Ping :', ':ping_pong: Pong !')
                    .addField(":clock2: Times :", `${Date.now() - startTime} millisecondes`, true)
                    .addField(":heartpulse: API Discord :", `${bot.ping} millisecondes`, true)
                .setTimestamp()
                .setFooter(footheren)
        break;
            
        case "annoucement":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't execute this command. ❌");
            let newi = message.content.split(" ");
            newi.shift();
            var annoucement_embed = new Discord.RichEmbed()
                    .addField("Announcements !", " "+ newi.join(" "))
                .setColor("#FFFB00")
                .setFooter("By Ilian ! ^^")
            message.delete();
            message.guild.channels.find("name", "annoucements").send(":arrow_down:@everyone:arrow_down:")
            member.guild.channels.find("name", "announcements").send(annoucement_embed);
        break;    
        
    /*    case "majinfo":
            if (message.author.id === "193092758267887616") {
                var maj_embed = new Discord.RichEmbed()
                    .setAuthor("Update " + version, "https://cdn.discordapp.com/avatars/438428510131060746/b55ee1f6fe4081aa6455059775581685.png")
                        .addField("🇫🇷Enorme Update🇫🇷,", "**Tout le code du bot a été retravailler, des commandes on été supprimers et les anciennes améliorer. Même système avec les réactions (🇫🇷/🇬🇧) **.")
                        .addField("🇬🇧BIG Update🇬🇧,", "**All the bot's code has been reworked, commands have been removed and the old ones have been improved. Same system with reactions (🇫🇷/🇬🇧)**.")
                    .setColor("#00FF6F")
                    .setFooter(version)
                    .setThumbnail("https://cdn.discordapp.com/avatars/438428510131060746/b55ee1f6fe4081aa6455059775581685.png")
                bot.channels.findAll('name', 'bot-update').map(channel => channel.send(maj_embed));
                message.delete()
            }
        break; */
    }
});

bot.login(process.env.TOKEN);
