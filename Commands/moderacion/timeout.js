const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("mute")
      .setDescription("Comando para mutear a un usuario")
      .addUserOption((option) => option.setName(`usuario`).setDescription(`Usuario a mutear`).setRequired(true))
      .addIntegerOption((option) => option.setName(`tiempo`).setDescription(`tiempo del muteo en minutos`).setRequired(true))
      .addStringOption((option) => option.setName(`razon`).setDescription(`Razon del mute`))
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser(`usuario`);
        const tiempo = interaction.options.getInteger(`tiempo`);
        const { guild } = interaction;

        let razon = interaction.options.getString(`razon`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);


    if (!razon) razon = "No se ha establecido ninguna razón";
    if(user.id === interaction.user.id) return interaction.reply({content:`No puedes mutearte a ti mismo`, ephemeral: true});
    if(user.id === client.user.id) return interaction.reply({content:`No puedes mutear`, ephemeral: true});
    if(member.roles.highest.position >= interaction.member.roles.highest.postion) return interaction.reply({content:`No puedes mutear a alguien superior o con tu mismo nivel`, ephemeral: true});
    if(!member.kickable) return interaction.reply({content:`No puedo mutear a alguien con un rol superior al mio`, ephemeral: true});
    if(tiempo > 10000) return interaction.reply({content: `El tiempo no puede superar los 10.000 minutos`, ephemeral: true});

    const embed = new EmbedBuilder()
    .setAuthor({ name:`${guild.name}`, iconURL:`${guild.iconURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/1062964556634279938/1063225119436181636/70515910726734841.jpg" }`, })
    .setTitle(`${user.tag} ha sido muteado del servidor`)
    .setColor(`#F0FC27`)
    .setTimestamp()
    .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
    .addFields({name: `Razon`, value: `${razon}`, inline:true}, {name: `tiempo`, value: `${tiempo}`, inline: true });


    await member.timeout(tiempo *60 *1000, razon).catch(console.error);

    interaction.reply({embeds:[embed]});


    },
  };