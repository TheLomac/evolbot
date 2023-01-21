const { Client, SlashCommandBuilder,  ActivityType, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("set-status")
    .setDescription("Este comando solo lo puede usar mi creador")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(
            option =>
            option.setName("opciones")
            .setDescription("Selecciona una opcion")
            .setRequired(true)
            .addChoices(
                { name: "Watching", value: "Watching" },
                { name: "Listening", value: "Listening" },
                { name: "Playing", value: "Playing" },
                { name: "Competing", value: "Competing" },
            )
        )
  .addStringOption(
        option =>
        option.setName("texto")
        .setDescription("Contenido de la actividad")
        .setRequired(true)),
  
   
    async execute(interaction, client) {
        const { options } = interaction;

         if (interaction.user.id !== '322590142000922624') return interaction.reply({ content: ':x: | Este comando solo lo pueden usar desarrolladores', ephemeral: true });
        //lo que hace esto es para que solo ustedes usen el comando

client.user.setActivity(`${options.getString("texto")}`, { type: ActivityType[`${options.getString("opciones")}`] })
//Aqui cuando terminen de rellenar se cambiara el estado del bot
       await interaction.reply({content: "Se actualizo el estado con exito", ephemeral: true})
       //Esto se mandara cuando el comando si funciono
    },
};