const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Comando para verificarse")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction) {

const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId(`ver`).setLabel(`Verify`).setStyle(ButtonStyle.Success),
);

const embed = new EmbedBuilder()
.setTitle(`Verifícate pulsando el botón`)
.setImage(`https://cdn.discordapp.com/attachments/1062964556634279938/1063269105702014996/anime_girl_heart.jpg`)





       await interaction.reply({embeds: [embed], components: [button] });
    },
};