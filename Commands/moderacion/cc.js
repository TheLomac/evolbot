const { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
  .setName('cc')
  .setDescription('Elimina un cierto número de mensajes.')
  .addIntegerOption(option =>
		  option.setName('cantidad')
			.setDescription('cantidad de mensajes a eliminar.')
			.setRequired(true)
    ),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('cantidad')

    if (amount > 100)
      return interaction.followUp({
          content: "La cantidad máxima para eliminar son 100 mensajes."
      });

   const messages = await interaction.channel.messages.fetch({
     limit: amount +1,
   });

   const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms('14 days'));

   await interaction.channel.bulkDelete(filtered);

   const succesEmbed = new EmbedBuilder()
   .setColor(0x32a852)
   .setTitle(":white_check_mark: Listo!")
   .setDescription(`Se han eliminado ${filtered.size - 1} mensaje(s).`)

   await interaction.reply({
     embeds: [succesEmbed]
   });
   await setTimeout(() => { interaction.deleteReply() }, 3500);
  }

}