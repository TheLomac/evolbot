const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    PermissionsBitField
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("lock")
      .setDescription("Cierra el canal")
      .addChannelOption((option) =>
        option.setName("canal").setDescription("selecciona un canal.")
        .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
    async execute(interaction, client) {
      const channel = interaction.options.getChannel("canal");
  
      const succesEmbed = new EmbedBuilder()
        .setColor(0xd98832)
        .setTitle(":lock: Cerrado!")
        .setDescription(`Canal completamente cerrado.`);
  
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: false,
        AttachFiles: false,
      });
  
      await channel.permissionOverwrites.edit(
        "1066314187179053076", //permisos a las que no afecta el lock
        {
          SendMessages: true,
          AttachFiles: true,
        }
      );
  
      await interaction.reply({
        embeds: [succesEmbed],
      });
    },
  };