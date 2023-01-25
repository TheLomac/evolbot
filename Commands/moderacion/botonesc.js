const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    ChannelType,
    PermissionFlagsBits
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("crearboton")
      .setDescription("Crea un boton con un mensaje embed y envialo a un canal.")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
      )
      .addStringOption((option) =>
      option
        .setName(`boton`)
        .setDescription(`nombre del boton`)
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
      .setName(`msgboton`)
      .setDescription(`mensaje boton`)
      .setRequired(true)
  ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
      const bname = interaction.options.getString(`boton`);
      const bmsg = interaction.options.getString(`msgboton`);
      const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`${bname}`).setLabel(`${bmsg}`).setStyle(ButtonStyle.Success),
        );
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
        fetchReply: true,
        components: [button]
      });
  
      interaction.reply({
        content: `Tu mensaje se envio con exito `,
        ephemeral: true,
      });
   },
  };