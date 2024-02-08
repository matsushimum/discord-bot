const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('janken')
        .setDescription('じゃんけんが始まります'),
        options:1,
    execute:async function(interaction){
        var hands = ["グー","チョキ","パー"];
        var a = hands[ Math.floor( Math.random() * hands.length+1 ) ] ;
        await interaction.reply(a);
    }
}