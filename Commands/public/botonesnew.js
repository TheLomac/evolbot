const {ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("newboton")
      .setDescription("Prueba de botones!!"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId(`hola`)
    .setLabel(`Hola`)
    .setStyle(ButtonStyle.Success),
)
await interaction.reply({components: [button]});
    },
  };