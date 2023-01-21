const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Comando para kikear a un usuario")
      .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario a kickear`).setRequired(true))
      .addStringOption((option) => option.setName(`razon`).setDescription(`Razon del kick`))
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser(`usuario`);
        const { guild } = interaction;

        let razon = interaction.options.getString(`razon`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);


    if (!razon) razon = "No se ha establecido ninguna razón";
    if(user.id === interaction.user.id) return interaction.reply({content:`No puedes kikearte a ti mismo`, ephemeral: true});
    if(user.id === client.user.id) return interaction.reply({content:`No puedes kikearme`, ephemeral: true});
    if(member.roles.highest.position >= interaction.member.roles.highest.postion) return interaction.reply({content:`No puedes kikear a alguien superior o con tu mismo nivel`, ephemeral: true});
    if(!member.kickable) return interaction.reply({content:`No puedo kikear a alguien con un rol superior al mio`, ephemeral: true});

    const embed = new EmbedBuilder()
    .setAuthor({ name:`${guild.name}`, iconURL:`${guild.iconURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/1062964556634279938/1063225119436181636/70515910726734841.jpg" }`, })
    .setTitle(`${user.tag} ha sido kikeado del servidor`)
    .setColor(`#F0FC27`)
    .setTimestamp()
    .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
    .addFields({name: `Razon`, value: `${razon}`});


    await member.kick(razon).catch(console.error);

    interaction.reply({embeds:[embed]});


    },
  };