const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('hogeta')
        .setDescription('ホゲータといいます'),
    execute:async function(interaction){
        await interaction.reply('ホゲータ');
    },
};

module.exports = hogeta;