const bot = require('discord.js');
const user = require('./User');

var minutes = 7;
var interval = minutes * 60 * 1000;


var mobAttackers = new Set();

var _discordBot;

class Mob {

    constructor(name, minHealth, maxHealth, drop, dropItemType, exp, embded) {
        this._name = name;
        this._startingHealth = 0;
        this._currentHealth = 0;
        this._minHealth = minHealth;
        this._maxHealth = maxHealth;
        this._drop = drop;
        this._dropItemType = dropItemType;
        this._dropChance = 0.1;
        this._exp = exp;
        this._embded = null;
        this._isAlive = false;
        this._color = null;
        this._thumbnail = null;
        this._picture = null;
    }

    mobRandomHealth() {
        return Math.floor(Math.random() * (this._maxHealth - this._minHealth)) + this._minHealth;
    }

}

var currentMob = null;

const hebrewEnderMan = 'אנדרמן';
const hebrewPigMan = 'פיגמן';
const hebrewSpider = 'עכביש';
const hebrewZombie = 'זומבי';
const hebrewCreeper = 'קריפר';
const hebrewSkeleton = 'סקלטון';
const hebrewBlaze = 'בלייז';


function fractionHealth(mob) {

    var currentHealth = mob._currentHealth;
    var startingHealth = mob._startingHealth;

    return ((currentHealth/startingHealth)*10).toFixed(2);

}

function getMobHealth(mob) {

    var healthString = "";
    var i = 0
    for (i = 0; i < fractionHealth(mob); i++) {
        healthString += ":heart:";
    }
    for (i; i < 10; i++) {
        healthString += ":black_heart:";
    }

    return healthString;
}

function calculateMaxDamage(level) {

    if (level < 5) return 1;
    if (level >= 5 && level < 10) return 2;
    if (level >= 10 && level < 20) return 3;
    if (level >= 20) return 4;

}

function spawnMob(channel) {
    const random = Math.floor(Math.random() * 7);
    switch (random) {
        case 0:
            currentMob = new Mob(hebrewEnderMan, 10, 20, '<:EnderManShard:703584739176742942>', "EnderManShard", 1);
            updateMobSentences();
            currentMob._color = '#0a0a0a';
            currentMob._startingHealth = currentMob.mobRandomHealth();
            currentMob._currentHealth = currentMob._startingHealth;
            currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/2/2d/EndermanFace.png';
            currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/b/b2/EndermanNormal.png';
            const enderManEmbed = new bot.MessageEmbed() 
                .setColor(currentMob._color)
                .setTitle(hebrewEnderMan)
                .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
                .setThumbnail(currentMob._thumbnail)
                .addFields (
                    { name: 'כמות חיים', value: currentMob._startingHealth + "/" + currentMob._currentHealth},
                    { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                    { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
                )
                .setImage(currentMob._picture);
                currentMob._embded = enderManEmbed;
                channel.then(ch => ch.send(currentMob._embded));
                currentMob._isAlive = true;
                break;

        case 1:
            currentMob = new Mob(hebrewPigMan, 21, 35, '<:PigManShard:703256449052311663>', "PigManShard", 1);
            updateMobSentences();
            currentMob._color = '#f17beb';
            currentMob._startingHealth = currentMob.mobRandomHealth();
            currentMob._currentHealth = currentMob._startingHealth;
            currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/d/d1/ZombiePigmanFace.png';
            currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/d/dc/ZombiePigmanNew.png';
            const pigManEmbded = new bot.MessageEmbed() 
            .setColor(currentMob._color)
            .setTitle(hebrewPigMan)
            .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
            .setThumbnail(currentMob._thumbnail)
            .addFields (
                { name: 'כמות חיים', value: currentMob._startingHealth + "/" + currentMob._currentHealth},
                { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
            )
            .setImage(currentMob._picture);
            currentMob._embded = pigManEmbded;
            channel.then(ch => ch.send(currentMob._embded));
            currentMob._isAlive = true;
            break;
    
        case 2:
            currentMob = new Mob(hebrewSpider, 12, 21, '<:SpiderShard:703256294563512360>', "SpiderShard", 1);
            updateMobSentences();
            currentMob._color = '#3e3e3e';
            currentMob._startingHealth = currentMob.mobRandomHealth();
            currentMob._currentHealth = currentMob._startingHealth;
            currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/0/05/SpiderFace.png';
            currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/c/cb/New_Spider_Texture.png';
            const spiderEmbded = new bot.MessageEmbed() 
            .setColor(currentMob._color)
            .setTitle(hebrewSpider)
            .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
            .setThumbnail(currentMob._thumbnail)
            .addFields (
                { name: 'כמות חיים', value: currentMob._currentHealth + "/" + currentMob._currentHealth},
                { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
            )
            .setImage(currentMob._picture);
                        
            currentMob._embded = spiderEmbded;
            channel.then(ch => ch.send(currentMob._embded));
            currentMob._isAlive = true;
            break;
    
        case 3:
            currentMob = new Mob(hebrewZombie, 15, 30, '<:ZombieShard:703255498857644032>', "ZombieShard", 1);
            updateMobSentences();
            currentMob._color = '#8c0e29';
            currentMob._startingHealth = currentMob.mobRandomHealth();
            currentMob._currentHealth = currentMob._startingHealth;
            currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/b/b2/ZombieFace.png';
            currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/e/e8/New_Zombie.png';
            const zombieEmbded = new bot.MessageEmbed()
            .setColor(currentMob._color)
            .setTitle(hebrewZombie)
            .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
            .setThumbnail(currentMob._thumbnail)
            .addFields (
                { name: 'כמות חיים', value: currentMob._currentHealth + "/" + currentMob._startingHealth },
                { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
            )
            .setImage(currentMob._picture);
            currentMob._embded = zombieEmbded;
            channel.then(ch => ch.send(currentMob._embded));
            currentMob._isAlive = true;
            break;
    
        case 4:
                currentMob = new Mob(hebrewCreeper, 10, 19, '<:CreeperShard:703255092089847889>', "CreeperShard", 1);
                updateMobSentences();
                currentMob._color = '#2e8c0e';
                currentMob._currentHealth = currentMob.mobRandomHealth();
                currentMob._startingHealth = currentMob._currentHealth;
                currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/5/5e/CreeperFace.png';
                currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/e/ee/CreeperImage.png';
                const creeperEmbded = new bot.MessageEmbed()
                .setColor(currentMob._color)
                .setTitle(hebrewCreeper)
                .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
                .setThumbnail(currentMob._thumbnail)
                .addFields (
                    { name: 'כמות חיים', value: currentMob._currentHealth + "/" + currentMob._startingHealth},
                    { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                    { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
                )
                .setImage(currentMob._picture);
                currentMob._embded = creeperEmbded;
                channel.then(ch => ch.send(currentMob._embded));
                currentMob._isAlive = true;
                break;
    
        case 5:
                currentMob = new Mob(hebrewSkeleton, 13, 24, '<:SkeletonShard:703255383304569006>', "SkeletonShard", 1);
                updateMobSentences();
                currentMob._color = '#ffffff';
                currentMob._startingHealth = currentMob.mobRandomHealth();
                currentMob._currentHealth = currentMob._startingHealth;
                currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/d/dc/SkeletonFace.png';
                currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/2/2c/SkeletonNew.png';
                const skeletonEmbded = new bot.MessageEmbed()
                .setColor(currentMob._color)
                .setTitle(hebrewSkeleton)
                .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
                .setThumbnail(currentMob._thumbnail)
                .addFields (
                    { name: 'כמות חיים', value: currentMob._startingHealth + "/" + currentMob._currentHealth },
                    { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                    { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
                )
                .setImage(currentMob._picture);
                currentMob._embded = skeletonEmbded;
                channel.then(ch => ch.send(currentMob._embded));
                currentMob._isAlive = true;
                break;
    
        case 6:
                currentMob = new Mob(hebrewBlaze, 14, 22, '<:BlazeShard:703255703564845126>', "BlazeShard", 1);
                updateMobSentences();
                currentMob._startingHealth = currentMob.mobRandomHealth();
                currentMob._currentHealth = currentMob._startingHealth;
                currentMob._thumbnail = 'https://vignette.wikia.nocookie.net/minecraft/images/3/31/Blaze_Face.png';
                currentMob._picture = 'https://vignette.wikia.nocookie.net/minecraft/images/1/14/BlazeMob.gif';
                const blazeEmbded = new bot.MessageEmbed()
                .setColor('#fcff28')
                .setTitle(hebrewBlaze)
                .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
                .setThumbnail(currentMob._thumbnail)
                .addFields (
                    { name: 'כמות חיים', value: currentMob._startingHealth + "/" + currentMob._currentHealth },
                    { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                    { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
                )
                .setImage(currentMob._picture);
                currentMob._embded = blazeEmbded;
                channel.then(ch => ch.send(currentMob._embded));
                currentMob._isAlive = true;
                break;
        
    }
}

var mobSentences = [];

function updateMobSentences() {
    mobSentences = [
        'אוי לא יש כאן ' + currentMob._name,
        'מוכנים או לא הינה בא ' + currentMob._name,
        'תקראו לעוגייה כי הינה מגיע ' + currentMob._name,
        'מי בא?! מי בא?! אמר ה' + currentMob._name,
        'אולי אם נתן ל' + currentMob._name + ' משו לאכול הוא יילך...',
        'הכל היה טוב עד שאומת ה' + currentMob._name + ' תקפה ',
    ];
    if (currentMob._name == 'עכביש') {
        mobSentences.push('אוי איזה מביש, תפס אותי עכביש');
    }
    if (currentMob._name == 'קריפר') {
        mobSentences.push('ראית אותך... בצנצנת חמוצים שלי');
        mobSentences.push('מלפפון חמוץ?');
    }
    if (currentMob._name == 'סקלטון') {
        mobSentences.push('שק עצמות..');
    }
    if (currentMob._name == 'זומבי') {
        mobSentences.push('זה לא הזה מהקליפ של מייקל גקסון?..');
    }
}


function incrementItemCount(user) {

    switch (currentMob._dropItemType) {
        case "EnderManShard":
            var shard = parseInt(user._EnderManShards);
            shard += 1;
            user._EnderManShards = shard.toString();
            break;
        case "PigManShard":
            var shard = parseInt(user._PigManShards);
            shard += 1;
            user._PigManShards = shard.toString();
            break;
        case "SpiderShard":
            var shard = parseInt(user._SpiderShards);
            shard += 1;
            user._SpiderShards = shard.toString();
            break;
        case "ZombieShard":
            var shard = parseInt(user._ZombieShards);
            shard += 1;
            user._ZombieShards = shard.toString();
            break;
        case "SkeletonShard":
            var shard = parseInt(user._SkeletonShards);
            shard += 1;
            user._SkeletonShards = shard.toString();
            break;
        case "BlazeShard":
            var shard = parseInt(user._BlazeShards);
            shard += 1;
            user._BlazeShards = shard.toString();
            break;
        case "CreeperShard":
            var shard = parseInt(user._CreeperShards);
            shard += 1;
            user._CreeperShards = shard.toString();
            break;
    }
}

function incrementKillCount(user) {

    switch (currentMob._name) {
        case "אנדרמן":
            var mob = parseInt(user._EnderManKills);
            mob += 1;
            user._EnderManKills = mob.toString();
            break;
        case "פיגמן":
            var mob = parseInt(user._PigManKills);
            mob += 1;
            user._PigManKills = mob.toString();
            break;
        case "עכביש":
            var mob = parseInt(user._SpiderKills);
            mob += 1;
            user._SpiderKills = mob.toString();
            break;
        case "זומבי":
            var mob = parseInt(user._ZombieKills);
            mob += 1;
            user._ZombieKills = mob.toString();
            break;
        case "סקלטון":
            var mob = parseInt(user._SkeletonKills);
            mob += 1;
            user._SkeletonKills = mob.toString();
            break;
        case "בלייז":
            var mob = parseInt(user._BlazeKills);
            mob += 1;
            user._BlazeKills = mob.toString();
            break;
        case "קריפר":
            var mob = parseInt(user._CreeperKills);
            mob += 1;
            user._CreeperKills = mob.toString();
            break;
    }

}

//mobs = [enderMan, pigMan, spider, zombie, creeper, skeleton, blaze];
module.exports = {

    damageEntity: function damageEntity (user, member, channel) {
        
        if (currentMob._isAlive) {
            if (user != null) {
                var userLevel = user._Level;
                var maxDamage = calculateMaxDamage(userLevel) + 1;
                var minDamage = 0;
                

                var damageDealt = Math.floor(Math.random() * maxDamage) + minDamage;
    
                var damageString = ""
                if (damageDealt == 0) {
                    damageString += "פספת!"
                } else {
                    if (currentMob._currentHealth <= damageDealt && !mobAttackers.has(user)) {
                        channel.then(ch => ch.send("אם לא תקפת, אז לא גם הרגת" + " <@" + member.id + "> "));
                    } 
                    else {
                        //user._TimesAttacked += 1;
                        damageString += "נזק: " + damageDealt;
                        mobAttackers.add(user); 

                        currentMob._currentHealth -= damageDealt;

                        if (currentMob._currentHealth <= 0) {
                            //Increment kill number for certain mob
                            incrementKillCount(user);
            
                            //Increase killer exp by mobs health
                            user._Exp += Math.floor((currentMob._maxHealth)/2);
            
                            var dropRoll = Math.random();
                            if (dropRoll < currentMob._dropChance) {
                                channel.then(ch => ch.send("<@" + member.id + ">" + " קיבל/ה שארד!"));
                                incrementItemCount(user);
            
                            }
                            this._discordBot.user.setPresence({ activity: {name: member.displayName + ' הרג את ה'  + currentMob._name}, status: 'סטטוס'}).catch(console.error);
                            currentMob._currentHealth = 0;
                            currentMob._name = "ה" + currentMob._name + " חוסל על-ידי " + member.displayName;
                            currentMob._isAlive = false;
                            currentMob._thumbnail = member.user.displayAvatarURL();
                            currentMob._picture = 'https://vignette.wikia.nocookie.net/attack-of-the-bteam/images/b/bf/Untitled_%2810%29.png/revision/latest?cb=20160510030026';
                            
                        }
            
                        currentMob._embded = new bot.MessageEmbed()
                        .setColor(currentMob._color)
                        .setTitle(currentMob._name)
                        .setDescription(mobSentences[Math.floor(Math.random() * mobSentences.length)])
                        .setThumbnail(currentMob._thumbnail)
                        .addFields (
                            { name: 'כמות חיים', value: currentMob._currentHealth + "/" + currentMob._startingHealth },
                            { name: 'מד חיים', value: getMobHealth(currentMob), inline:true},
                            { name: 'עשוי להפיל', value: currentMob._drop, inline:true}
                        )
                        .setImage(currentMob._picture)
                        .setFooter('הותקף ע"י ' + member.displayName + "\n" + damageString, member.user.displayAvatarURL());
            
                        if (currentMob._currentHealth == 0) {
                            currentMob._embded.setDescription('תודה שהצלת את היום! \n לפחות עד שהמפלצת הבאה תבוא..');
                            
                        }
            
                        channel.then(ch => ch.send(currentMob._embded));
                        
            

                    }
                }
                //on mob death

                
            }
        } else {
            channel.then(ch => ch.send("כן אממ.. המוב קצת מת, אפשר לחכות בבקשה להבא שיבוא? תודה"));
        }
          
    },
    spawnEntity: function spawnEntity (channel, discordBot) {
        this._discordBot = discordBot;
        if (channel != null) {
            spawnMob(channel);
            discordBot.user.setPresence({ activity: {name: 'זהירות יש לנו ' + currentMob._name}, status: 'סטטוס'}).catch(console.error);
            setInterval(() => {
                
                if (!currentMob._isAlive) {
                    spawnMob(channel);
                    mobAttackers = new Set();
                    discordBot.user.setPresence({ activity: {name: 'זהירות יש לנו ' + currentMob._name}, status: 'סטטוס'}).catch(console.error);
                }
            }, interval);
        }
    }
};