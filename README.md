# TCDiscordBot
A Discord Bot that was made for a Minecraft server named TaleCraft


An interactive discord bot using Discord & Discord.js' API and MySQL to save players' gain.

The bot would be assigned a specified channel to "summon" minecraft mobs and then he would send an updating message accordingly
players would be able to write a command in chat specified for attacking the mob and the bot would resend the message, updated,
with the mob and the damage done to him.

Player's damage formula would depends on their current role on the server, the higher the role the higher the maximum damage
that the player could deal, as well as lower chances for missing a hit.

Each mob is capable of "dropping" a so called shard item that players could collect and compete with other player on the server.

Players could also write a command in a different assigned text-channel to check their current stats, their level,
their role in the server, their current experience and how close they're to the next level(Also a bar that fills up accordingly)
their kill amount for each of the 7 mobs, and their total shard drops for each shard available in the game.

#TODO
-Clean up the code
-Give a meaning for the shard



#What would shards do

Talecraft is a minecraft server for youtubers and content creators, therefore it would be a possibility to make the shards
that the player collect thus far to be able to spawn an INGAME mob for a streamer who plays in the server
Therefore a C2S and S2C handling must be built
