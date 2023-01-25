const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    ChannelType,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("embed")
      .setDescription("Envia un embed")
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
      .addChannelOption((option) => {
        return option
          .setName(`canal`)
          .setDescription("Canal para mandar el embed.")
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText);
      })
      .addStringOption((option) => 
        option
            .setName(`titulo`)
            .setDescription("mensaje")
            .setRequired(true)
            )
      .addStringOption((option) =>
        option
          .setName(`mensaje`)
          .setDescription(`Escribe aqui tu mensaje`)
          .setRequired(true)
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
      const cont = interaction.options.getString(`mensaje`);
      const titu = interaction.options.getString(`titulo`);
      const canal = interaction.options.getChannel("canal");

  
      const { guild } = interaction;
  
      const channel = interaction.guild.channels.cache.find(
        (c) => c.id === canal
      );
  
      const embed = new EmbedBuilder()
        .setTitle(`${titu}`)
        .setColor(`Blue`)
        .setDescription(`${cont}`)
        .setTimestamp()
        .setFooter({
          text: `Mensaje enviado por la administración.`
        });
        
  
        client.channels.cache.get(canal.id).send({
        embeds: [embed],
        fetchReply: true
      });
  
      interaction.reply({
        content: `Tu mensaje se envio con exito `,
        ephemeral: true,
      });
   },
  };