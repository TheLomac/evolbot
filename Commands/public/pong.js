const {ChatInputCommandInteraction, SlashCommandBuilder, } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("pong")
      .setDescription("Te respondere Ping!! \n Este comando es solo visible para todo el mundo"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
      interaction.reply({ content: "Ping!!", ephemeral: false }); //este ephemeral es para que lo vea solo el usuario
    },
  };