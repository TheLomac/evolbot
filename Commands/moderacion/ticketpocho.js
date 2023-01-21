const {ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder,ButtonBuilder, ButtonStyle, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("pocho")
      .setDescription("Usa este comando para crear un ticket de ayuda.")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`test1`)
            .setLabel(`Crear ticket`)
            .setStyle(ButtonStyle.Primary),
        );

        const embed = new EmbedBuilder()
        .setTitle(`Puedes usar el botón para crear un ticket`)

        const embed1 = new EmbedBuilder()
        .setTitle(`Ticket creado`)
        const button2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`test3`)
            .setLabel(`Borrar ticket`)
            .setStyle(ButtonStyle.Danger),
        );

        await interaction.channel.send({embeds:[embed], components:[button]});
        await interaction.reply({content:`El mensaje de ticket se envio correctamente`, ephemeral: true});


        const collector = interaction.channel.createMessageComponentCollector();

        collector.on(`collect`, async (i) =>{
            const channel = await interaction.guild.channels.create({
                name: `Ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: `1063303865694433290`
            });

            channel.permissionOverwrites.create(i.user.id,{
                ViewChannel : true,
                SendMessages: true
            });

            channel.permissionOverwrites.create(channel.guild.roles.everyone, {
                ViewChannel: false,
                SendMessages: false
            });
            await i.reply({
                content: `Tu ticket se creo con exito`,
                ephemeral: true,
              });

            channel.send({embeds:[embed1], components:[button2] })
        });
    },
  };