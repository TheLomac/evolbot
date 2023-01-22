const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder , SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ayuda")
  .setDescription("Menu de ayuda"),

  async execute(interaction){
		
		const cmp = new ActionRowBuilder()
    .addComponents(
			new StringSelectMenuBuilder()
      .setCustomId("Menu")
      .addOptions([
         {
          label: "Menu principal",
          description: "Menu principal.",
          value: "princi",
          emoji: "⚙️" 
        },
        {
          label: "Configuración",
          description: "Mira los comandos de Configuración.",
          value: "Opcion_1",
          emoji: "🟩" 
        },
        {
          label: "Interacción",
          description: "Mira los comandos de Interacción.",
          value: "interacción",
          emoji: "❤️"        
        }
      ])
)
  const user = interaction.user;
    
   

   const embed = new EmbedBuilder()
      .setTitle("Menú de Ayuda") 
		  .setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063269105702014996/anime_girl_heart.jpg")
      .setColor("Random")
      .setDescription(`AUN EN DESARROLLO`)
    
     let mensaje = await interaction.reply({ embeds: [embed], components: [cmp] })

    const filtro = i => i.user.id === interaction.user.id; user.id; 

    let collector = interaction.channel.createMessageComponentCollector({ filter: filtro })

    const embed1 = new EmbedBuilder()
    .setTitle("Comandos de Configuración")
    .setDescription("LISTA DE COMANDOS")
	.setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063225119436181636/70515910726734841.jpg")
    .setFooter({ text: "EN DESARROLLO" })
    .setTimestamp()
    .setColor("Random")

    const embed2 = new EmbedBuilder()
    .setTitle("Comandos de Interaccion")
    .setDescription("LISTA DE COMANDOS")
    .setImage("https://cdn.discordapp.com/attachments/1062964556634279938/1063261549650784336/914465chitanda.png")
    .setFooter({ text: "EN DESAROLLO" })
    .setTimestamp()
    .setColor("Random")


collector.on("collect", async i => {
      if(i.values[0] === "princi"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed], components: [cmp] })
       } 
    })

    collector.on("collect", async i => {
      if(i.values[0] === "Opcion_1"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed1], components: [cmp] })
       } 
    })
     
     collector.on("collect", async i => {
      if(i.values[0] === "interacción"){
        await i.deferUpdate()
        i.editReply({ embeds: [embed2], components: [cmp] })
       } 
     })
  }
}