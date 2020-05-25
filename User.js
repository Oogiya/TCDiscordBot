class User {
    
    constructor(DiscordID, Exp, Status, LastActive, Level, LastBuy) {

        //User Information
        this._userID = null;
        this._DiscordID = DiscordID;
        this._Exp = Exp;
        this._Status = Status;
        this._LastActive = LastActive;
        this._Level = Level;
        this._LastActive = LastBuy;
        this._TimesAttacked = 0;

        //User Kills
        this._EnderManKills = 0;
        this._PigManKills = 0;
        this._SpiderKills = 0;
        this._ZombieKills = 0;
        this._CreeperKills = 0;
        this._SkeletonKills = 0;
        this._BlazeKills = 0;

        //User Inventory
        this._EnderManShards = 0;
        this._PigManShards = 0;
        this._SpiderShards = 0;
        this._ZombieShards = 0;
        this._CreeperShards = 0;
        this._SkeletonShards = 0;
        this._BlazeShards = 0;


    }


    initiateStats(value) {
        this._TimesAttacked = value; 
    }

    distributeInventory(string) {
        //format: 000-000-000-000-000-000-000
        var result = string.split("-");
        this._EnderManShards = result[0];
        this._PigManShards = result[1];
        this._SpiderShards = result[2];
        this._ZombieShards = result[3];
        this._CreeperShards = result[4];
        this._SkeletonShards = result[5];
        this._BlazeShards = result[6];

    }

    distributeKills(string) {
        //format: 000-000-000-000-000-000-000
        var result = string.split("-");
        this._EnderManKills = result[0];
        this._PigManKills = result[1];
        this._SpiderKills = result[2];
        this._ZombieKills = result[3];
        this._CreeperKills = result[4];
        this._SkeletonKills = result[5];
        this._BlazeKills = result[6];

    }

    get Exp() {
        return this.Exp;
    }

    get Level() {
        return this.Level;
    }

    get LastActive() {
        return this.LastActive;
    }
}

module.exports = User;