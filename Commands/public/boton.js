const {ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("boton")
      .setDescription("Prueba de botones!!"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId(`test1`)
    .setLabel(`Success`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`test2`)
    .setLabel(`Danger`)
    .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
    .setCustomId(`test3`)
    .setLabel(`Primary`)
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId(`test4`)
    .setLabel(`Secondary`)
    .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
    .setURL(`https://www.google.com`)
    .setLabel(`Link`)
    .setStyle(ButtonStyle.Link)

)

await interaction.reply({components: [button]});


const collector = interaction.channel.createMessageComponentCollector();


collector.on(`collect`, async (i) => {
    await i.update({content: `Hola ¿Cómo estas?`, components: [button]})
});
    },
  };