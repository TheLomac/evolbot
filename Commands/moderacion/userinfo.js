const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Informacion de un usuario")
    .addUserOption(option =>
        option.setName("usuario")
            .setDescription("Informacion del usuario.")
            .setRequired(true)
    ),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute (interaction) {
        const user = interaction.options.getUser("usuario");
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor(0x5fb041)
        .setAuthor({ name: tag, iconURL: icon})
        .setThumbnail(icon)
        .addFields({ name: "Miembro", value: `${user}`, inline: false})
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
        .addFields({ name: "Se unio", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: "Registrado", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
        .addFields({ name: "ID:", value: `${user.id}`, inline: false})
        .setFooter({ text: `Solicitado por: ${interaction.user.tag}`})
        .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
  };