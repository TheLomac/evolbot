const {ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Embed } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("menu")
      .setDescription("Prueba de menu con botones"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId(`boton`)
    .setLabel(`Menu`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`boton1`)
    .setLabel(`Pagina 1`)
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId(`boton2`)
    .setLabel(`Pagian 2`)
    .setStyle(ButtonStyle.Primary)
);

const embed = new EmbedBuilder()
.setTitle(`Menu`)
.setDescription(`Pagina 1 Comando funcionales, Pagina 2 comandos para mods`)

const embed1 = new EmbedBuilder()
.setTitle(`Funcionalidades`)
.addFields({name : `/usuario`, value: `Información sobre un usuario` })

const embed2 = new EmbedBuilder()
.setTitle(`Mods`)
.setDescription(`/kick`)


await interaction.reply({embeds: [embed], components: [button]});


const collector = interaction.channel.createMessageComponentCollector();


collector.on(`collect`, async (i) => {

    if(i.customId === `boton`) {
        if(i.user.id !== interaction.user.id){
            return await i.reply({content:`Este comando fue ejecutado por otra persona.`, ephemeral: true})
        }
        await i.update({embeds: [embed], components: [button]})
    }
    if(i.customId === `boton1`) {
        if(i.user.id !== interaction.user.id){
            return await i.reply({content:`Este comando fue ejecutado por otra persona.`, ephemeral: true})
        }
        await i.update({embeds: [embed1], components: [button]})
    }
    if(i.customId === `boton2`) {
        if(i.user.id !== interaction.user.id){
            return await i.reply({content:`Este comando fue ejecutado por otra persona.`, ephemeral: true})
        }
        await i.update({embeds: [embed2], components: [button]})
    }

});
    },
  };