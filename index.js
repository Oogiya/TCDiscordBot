// register = v
// update = v
// level = v
// role for level = v
// command for exp = 

var Discord = require("discord.js");
var bot = new Discord.Client();
var SQL = require("mysql");

const spawner = require('./Spawner');
const updater = require("./Updater");

const recentAttackers = new Set();
const attackDelay = 3 * 1000;

let userMap = new Map();

var User = require("./User");

var taleCraftDiscord;


const levelRequirment = [0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358,
1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842];

const levelMap = new Map();
levelMap.set(1, '693108498715639849');
levelMap.set(5, '699557923201876018');
levelMap.set(10, '700457984064749596');
levelMap.set(20, '700458145385807902');


const expPerMsg = 2;
const expSuperior = 0;
const expEvent = 0;

bot.login('NzAyOTM0OTY2NDgwMjczNTc5.XqHRbw.zhlkXN9P4C6fazOmdGpbZfSwIRQ');

var con = SQL.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "1324",
    database: "TaleCraft"
});

var userList = [];

bot.on('ready', () => {

    var mobChannel = bot.channels.fetch('703608984904532039');

    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect' + err)
        }
        else {
            console.log('Connected to database')
        }
    })

    taleCraftDiscord = bot.guilds.cache.find(gld => gld.id == '693101941328314400');
    getUserList();
    updater.updateSQL(con, userMap);
    spawner.spawnEntity(mobChannel, bot);

    //bot.user.setPresence({ activity: { name: 'מזמן מובים'}, status: 'ממתין'}).catch(console.error);
});



function getUserList() {

    var query = "SELECT * FROM Users";

    con.query(query, function(err, result) {
         if (err) {
            console.log("Failed to get users");
        } else {
            for (var i = 0; i < result.length; i++) {
                var user = result[i]
                let newUser = new User(user.DiscordID, user.Exp, user.Status, user.LastActive,
                    user.Level, user.LastBuy);
                newUser.distributeInventory(user.Inventory);
                newUser.distributeKills(user.MobKills);
                newUser.initiateStats(user.TimesAttacked);
                newUser._userID = user.UserID;
                userMap.set(newUser._DiscordID, newUser);
            }
        }
    });
    
}



function addUserToList(user) {
    
    let newUser = new User(user.id, 1, 1, new Date().getDay(), 1, null);

    userMap.set(newUser._DiscordID, newUser);

    var query = "INSERT INTO users (DiscordID, Exp, Status, LastActive, Level) VALUES ('" + 
    newUser._DiscordID + "', " + newUser._Exp + ", " + newUser._Status + ", " + newUser._LastActive + ", " + newUser._Level
    + ")";

    con.query(query, function(err, result) {
        if (err) {
            console.log("Failed to add user to list, err: " + err);
        }
        else {
            console.log("New user added to list");
        }
    })

}

function checkLevelRole (user, member) {

    var channel = bot.channels.fetch('703609565794795580');

    if (levelMap.get(user._Level) != null && !member.roles.cache.find(role => role.id == levelMap.get(user._Level))) {
        member.roles.add(levelMap.get(user._Level));
        var roleName = taleCraftDiscord.roles.cache.find(rl => rl.id == levelMap.get(user._Level)).name;
        channel.then(ch => ch.send("הו וואו הולי שיט!! קיבלת רול חדש " + "<@" + member.id + ">" + " איזה יופי של " + "**" + roleName + "**"));
    }

}

function checkLevelUp (user, member) {

    var channel = bot.channels.fetch('703609565794795580');

    if (user._Exp >= levelRequirment[user._Level]) {
        user._Level++;
        if (levelMap.get(user._Level) != null) {
            checkLevelRole(user, member);
        } else {
            channel.then(ch => ch.send("ווא ויי!! " + "<@" + member.id + ">" + " עלית לרמה " + user._Level + "!"));
        }
        
        
    }

}

function mentionMember(member) {
    return "<@" + member.id + ">";
}

function getClosestRank(user) {
    
    if (user != null) {
        if (user._Level < 5) return 1;
        if (user._Level >= 5 && user._Level < 10) return 5;
        if (user._Level >= 10 && user._Level < 20) return 10;
        if (user._Level >= 20) return 20;
    }


}

function fractionExp (user) {
    
    var userExp = user._Exp;
    var userLevel = user._Level;

    return ((userExp - levelRequirment[userLevel - 1])/(levelRequirment[userLevel] - levelRequirment[userLevel - 1]) * 10).toFixed(2);

}

bot.on('message', message => {
    var mobChannel = bot.channels.fetch('703608984904532039');
    var channel = bot.channels.fetch('703609565794795580');
    if (message.member != null) {
        if (message.member.id != '702934966480273579') {
            var member = message.member;
            var user = userMap.get(message.member.id);
            if (userMap.get(message.member.id) != null) {
                if (!message.content.startsWith('!')) {
                    
                    
                    var guild = bot.guilds;
                }
                
            }
            else {
                addUserToList(message.member);
            }
            
            if (userMap.get(message.member.id) != null) {
                if (message.channel.id == '703608984904532039') {
                    if ((message.content == "!התקפה") == false) {
                        message.delete();
                    }
                }

                if (message.content == "!התקפה") {
                    if (recentAttackers.has(member.id)) {
                        mobChannel.then(ch => ch.send('ניתן לתקוף פעם ב3 שניות'));
                    } else {
                        spawner.damageEntity(userMap.get(member.id), member, mobChannel);
                        checkLevelUp(userMap.get(member.id), member);
                        recentAttackers.add(member.id);
                        setTimeout(() => {
                            recentAttackers.delete(member.id);
                        }, attackDelay);
                        
                    }
                }
                
                if (message.content == "!ניסיון") {
                    console.log(userMap.get(member.id));
                }

                if (message.content == "!שמירה") {
                    if (message.member.roles.cache.find(r => r.id == "✨TaleCraft✨")) {
                        updater.instantUpdate(con, userMap);
                        message.channel.send("שמירה בוצעה");
                    } else {
                        message.channel.send("אין לך גישה לפקודה הזו.");
                    }
                }

                if (message.content == "!אני") {
                    if (user != null) {
                        var roleName = taleCraftDiscord.roles.cache.find(rl => rl.id == levelMap.get(getClosestRank(user))).name;
                        var displayName = member.displayName;
                        var msg = "";
                        var i = 0;
                        for (i = 1; i < fractionExp(user); i++) {
                            msg += (":green_square:");
                        }
                        for (i; i <= 10; i++) {
                            msg += (":red_square:");
                        }
                        const expEmbed = new Discord.MessageEmbed()
                            .setColor('#f6acc8')
                            .setDescription(roleName)
                            .setTitle(displayName)
                            .setThumbnail(member.user.displayAvatarURL())
                            .addFields(
                                { name: 'רמה', value: user._Level, },
                                { name: 'ניקוד', value: user._Exp + "/" + levelRequirment[user._Level], inline: true},
                                { name: 'התקדמות לרמה הבאה - ' + (fractionExp(user) * 10).toFixed(2) + "%", value: msg }
                                )
                            .addFields(
                                { name: 'הריגות', value: 'אנדרמן: ' + user._EnderManKills + '\nפיגמן: ' + user._PigManKills + '\nעכביש: ' + user._SpiderKills
                            + '\nזומבי: ' + user._ZombieKills + '\nקריפר: ' + user._CreeperKills + '\nסקלטון: ' + user._SkeletonKills + '\nבלייז: ' + user._BlazeKills
                        , inline:true},
                                { name: 'שארדים', value: user._EnderManShards + ' <:EnderManShard:703584739176742942>\n' + user._PigManShards + ' <:PigManShard:703256449052311663>\n' 
                            + user._SpiderShards + ' <:SpiderShard:703256294563512360>\n' + user._ZombieShards + ' <:ZombieShard:703255498857644032>\n'
                            + user._CreeperShards + ' <:CreeperShard:703255092089847889>\n' + user._SkeletonShards + ' <:SkeletonShard:703255383304569006>\n'
                            + user._BlazeShards + ' <:BlazeShard:703255703564845126>', inline:true},
                            )
                            .setFooter('Play-IL', 'https://talecraft.co.il/img/forums.png')
                            .setImage('https://talecraft.co.il/img/logo.png')
                        message.channel.send(expEmbed);
                    }

                }
                else if ((message.channel.id == '703608984904532039') == false) {
                    userMap.get(member.id)._Exp += expPerMsg + expEvent + expSuperior;
                    checkLevelUp(userMap.get(member.id), member);
                    var currentDate = new Date();
                    userMap.get(message.member.id)._LastActive = "'" + currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getDay() + "'";
                }
            }
            else {
                addUserToList(message.member);
            }
            
        }
    }
});

