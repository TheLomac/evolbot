const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder , SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("cmdmod")
  .setDescription("Menu de ayuda para moderadores")
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),


  async execute(interaction){
		
		const cmp = new ActionRowBuilder()
    .addComponents(
			new StringSelectMenuBuilder()
      .setCustomId("Menumod")
      .addOptions([
         {
          label: "Menu principal",
          description: "Menu principal.",
          value: "princimod",
          emoji: "⚙️" 
        },
        {
          label: "Configuración",
          description: "Mira los comandos de Configuración.",
          value: "Opcion_1mod",
          emoji: "🔐" 
        },
        {
          label: "Moderación",
          description: "Mira los comandos de Moderación.",
          value: "moderaciónmod",
          emoji: "⛔"
        },
        {
          label: "Interacción",
          description: "Mira los comandos de Interacción.",
          value: "interacciónmod",
          emoji: "🔧"
        }
      ])
)
  const user = interaction.user;
    
   

   const embed = new EmbedBuilder()
      .setTitle("Menú de Ayuda") 
		  .setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063269105500700804/5ea5f78b5cbb1.jpeg")
      .setColor("#AAB7B8")
      .setDescription(`MENU DE AYUDA PARA MODERADORES`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Proximos comandos', value: 'esto van a ser los próximos comandos para moderación.' },
        { name: '/user-info', value: 'Con este comando podrás ver toda la información disponible sobre un usuario en el servidor.', inline: true }
      )
    
     let mensaje = await interaction.reply({ embeds: [embed], components: [cmp] })

    const filtro = i => i.user.id === interaction.user.id; user.id; 

    let collector = interaction.channel.createMessageComponentCollector({ filter: filtro })

    const embed1 = new EmbedBuilder()
    .setTitle("Comandos de Configuración")
    .setDescription("LISTA DE COMANDOS")
    .addFields(
        { name:'/ticket', value: 'Con este comando puedes crear el sistema de tickets. Tambien puedes eliminarlo usando /ticket eliminar', inline: true },
        { name: '/verify', value: 'Con este comando puedes crear un sistema de verificación de usuarios con roles.', inline: true },
        { name: '/set-status', value: 'Con este comando puedes cambiar el estado del bot.', inline: true },
        { name: '/reload', value: 'Con estos comandos puedes recargar el bot. Unicamente desarrolladores pueden usarlos.', inline: true }
    )
	.setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063225119436181636/70515910726734841.jpg")
    .setFooter({ text: "EN DESARROLLO" })
    .setTimestamp()
    .setColor("#AAB7B8")

    const embed2 = new EmbedBuilder()
    .setTitle("Comandos de Moderación")
    .setDescription("LISTA DE COMANDOS")
    .addFields(
        { name:'/kick', value: 'Con este comando puedes kickear a alguien del servidor.', inline: true },
        { name: '/ban', value: 'Con este comando puedes banear a alguien del servidor.', inline: true },
        { name: '/mute', value: 'Con este comando puedes mutear a alguien del servidor.', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Proximos comandos', value: 'esto van a ser los próximos comandos para moderación.' },
        { name: '/user-info', value: 'Con este comando podrás ver toda la información disponible sobre un usuario en el servidor.', inline: true }

    )
    .setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063225119436181636/70515910726734841.jpg")
    .setFooter({ text: "EN DESARROLLO" })
    .setTimestamp()
    .setColor("#AAB7B8")


    const embed3 = new EmbedBuilder()
    .setTitle("Listado de componentes")
    .setDescription("LISTA DE COMANDOS")
    .addFields(
      { name:'ver', value: 'Con este boton se asignará el rol de verificado.', inline: true },
      { name: 'mc', value: 'Con este boton se asignará el rol de MC.', inline: true },
      { name: '\u200B', value: '\u200B' },
      { name: 'Proximos comandos', value: 'esto van a ser los próximos comandos para moderación.' },
      { name: '/user-info', value: 'Con este comando podrás ver toda la información disponible sobre un usuario en el servidor.', inline: true }
    )
    .setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063225119436181636/70515910726734841.jpg")
    .setFooter({ text: "EN DESAROLLO" })
    .setTimestamp()
    .setColor("#AAB7B8")


collector.on("collect", async i => {
      if(i.values[0] === "princimod"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed], components: [cmp] })
       } 
    })

    collector.on("collect", async i => {
      if(i.values[0] === "Opcion_1mod"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed1], components: [cmp] })
       } 
    })
    
    collector.on("collect", async i => {
      if(i.values[0] === "moderaciónmod"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed2], components: [cmp] })
       } 
     })
     
     collector.on("collect", async i => {
      if(i.values[0] === "interacciónmod"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed3], components: [cmp] })
       } 
     })
  }
}