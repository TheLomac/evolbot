const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require('axios');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('interaccion')
    .setDescription('Comando de interacción.')
    //Agregar subcomandos para mas acciones y revisar si la acción requiere o no de un usuario
    .addSubcommand((subcommand) =>
    subcommand
        .setName("slap")
        .setDescription("slap action")
        .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario para slap`).setRequired(true))
      )
      .addSubcommand((subcommand) =>
      subcommand
          .setName("nyah")
          .setDescription("kiss action")
          .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario para kiss`).setRequired(true))
        ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === "slap") {
        const gifUrl = 'https://api.otakugifs.xyz/gif?reaction=slap'; //modificar url para cambiar de accion.
        axios.get(gifUrl).then(response => {
        const gifUrl = response.data.url;
        const member = interaction.options.getUser('usuario') || interaction.user      
        const embed = new EmbedBuilder()
        .setDescription(`ยก**${interaction.user.username}** ha bofeteado a **${member.username}** sin rencor!`)
        .setColor("DarkButNotBlack")
        .setImage(gifUrl)
        interaction.reply({ embeds: [embed] })
        console.log(gifUrl);
      
            });
        }
    
        if (interaction.options.getSubcommand() === "nyah") {
        const gifUrl = 'https://api.otakugifs.xyz/gif?reaction=nyah';
        axios.get(gifUrl).then(response => {
        const gifUrl = response.data.url;
        const member = interaction.options.getUser('usuario') || interaction.user      
        const embed1 = new EmbedBuilder()
        .setDescription(`ยก**${interaction.user.username}** ha nyah a **${member.username}** sin rencor!`)///////// cambiar el texto por la accion que hace
        .setColor("DarkButNotBlack")
        .setImage(gifUrl)
        interaction.reply({ embeds: [embed1] })
        console.log(gifUrl);
      
            });
        }
        //de aca para abajo poner las nuevas interaciones.
    },
};