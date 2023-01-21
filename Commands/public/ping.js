const {ChatInputCommandInteraction, SlashCommandBuilder, } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Te respondere Pong!! \n Este comando es solo visible para ti"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
      interaction.reply({ content: "Pong!!", ephemeral: true }); //este ephemeral es para que lo vea solo el usuario
    },
  };