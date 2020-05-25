const SQL = require('mysql');

var minutes = 5;
var interval = minutes * 60 * 1000;


function formatInventory(user) {

    var ender = "";
    var pig = "";
    var spider = "";
    var zombie = "";
    var creeper = "";
    var skeleton = "";
    var blaze = "";

    if (user._EnderManShards == 0) ender = "0-";
    else ender = parseInt(user._EnderManShards) + "-";
    if (user._PigManShards == 0) pig += "0-";
    else pig = parseInt(user._PigManShards) + "-";
    if (user._SpiderShards == 0) spider = "0-";
    else spider = parseInt(user._SpiderShards) + "-";
    if (user._ZombieShards == 0) zombie = "0-";
    else zombie = parseInt(user._ZombieShards) + "-";
    if (user._CreeperShards == 0) creeper = "0-";
    else creeper = parseInt(user._CreeperShards) + "-";
    if (user._SkeletonShards == 0) skeleton = "0-";
    else skeleton = parseInt(user._SkeletonShards) + "-";
    if (user._BlazeShards == 0) blaze = "0";
    else blaze = parseInt(user._BlazeShards);

    return ender + pig + spider + zombie + creeper + skeleton + blaze;

}

function formatKills(user) {

    var ender = "";
    var pig = "";
    var spider = "";
    var zombie = "";
    var creeper = "";
    var skeleton = "";
    var blaze = "";

    if (user._EnderManKills == 0) ender = "0-";
    else ender = parseInt(user._EnderManKills) + "-";
    if (user._PigManKills == 0) pig = "0-";
    else pig = parseInt(user._PigManKills) + "-";
    if (user._SpiderKills == 0) spider = "0-";
    else spider = parseInt(user._SpiderKills) + "-";
    if (user._ZombieKills == 0) zombie = "0-";
    else zombie = parseInt(user._ZombieKills) + "-";
    if (user._CreeperKills == 0) creeper = "0-";
    else creeper = parseInt(user._CreeperKills) + "-";
    if (user._SkeletonKills == 0) skeleton = "0-";
    else skeleton = parseInt(user._SkeletonKills) + "-";
    if (user._BlazeKills == 0) blaze = "0";
    else blaze = parseInt(user._BlazeKills);


    return ender + pig + spider + zombie + creeper + skeleton + blaze;
}


module.exports = {

    instantUpdate: function instantUpdate (connection, userMap) {
        if (connection != null) {
            console.log("Updating SQL...");
            for (const [key, value] of userMap.entries()) {
                var query = "UPDATE users SET Exp = " + value._Exp + ", Status = " +
                value._Status + ", Level = " + value._Level + ", TimesAttacked = " + value._TimesAttacked + ", MobKills = '" + formatKills(value).toString() + 
                "', Inventory = '" + formatInventory(value).toString() + "', LastActive = " + value._LastActive +
                 " WHERE UserID = " + 
                value._userID;
                connection.query(query, function(err, result) {
                    if (err) console.log("Error while updating: " + err);
                })
            }

            

            console.log("Finished Updating");
        }
    },

    updateSQL: function updateSQL (connection, userMap) {


        console.log("Trying to update SQL");
        if (connection != null) {
            setInterval(() => {
                console.log("Updating SQL...");
                for (const [key, value] of userMap.entries()) {
                    var query = "UPDATE users SET Exp = " + value._Exp + ", Status = " +
                    value._Status + ", Level = " + value._Level + ", MobKills = '" + formatKills(value).toString() + 
                    "', Inventory = '" + formatInventory(value).toString() + "', LastActive = " + value._LastActive +
                     " WHERE UserID = " + 
                    value._userID;
                    connection.query(query, function(err, result) {
                        if (err) console.log("Error while updating: " + err);
                    })
                }

                
    
                console.log("Finished Updating");
            }, interval);
        } else {
            console.log("Unable to load connection");
        }
    
    }
};

