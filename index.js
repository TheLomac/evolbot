process.noDeprecation = true;
const { Client, GatewayIntentBits, Partials, Collection, Events, AuditLogEvent, EmbedBuilder } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({ 
  intents: 3276799, 
  partials : [User, Message, GuildMember, ThreadMember]
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { connect } = require("mongoose");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true); 

connect(client.config.DatabaseURL,{

}).then(() => console.log("Base de datos conectada."));

loadEvents(client);
loadButtons(client);

client.login(client.config.token)


client.on(Events.GuildBanAdd, async (member) => {
  member.guild
    .fetchAuditLogs({
      type: AuditLogEvent.GuildBanAdd,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = member.user.username;
      const id = member.user.id;

      const channelID = `1063309785098891394`;
      const Channel = await member.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Usuario baneado`)
        .addFields({ name: `Nombre del usuario`, value: `${name}` })
        .addFields({ name: `ID del usuario`, value: `${id}` })
        .addFields({ name: `Baneado por`, value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

client.on(Events.GuildBanRemove, async (member) => {
  member.guild
    .fetchAuditLogs({
      type: AuditLogEvent.GuildBanRemove,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = member.user.username;
      const id = member.user.id;

      const channelID = `1063309785098891394`;
      const Channel = await member.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Usuario Desbaneado`)
        .addFields({ name: `Nombre del usuario`, value: `${name}` })
        .addFields({ name: `ID del usuario`, value: `${id}` })
        .addFields({ name: `Desbaneado por`, value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

client.on(Events.MessageDelete, async (message) => {
  message.guild
    .fetchAuditLogs({
      type: AuditLogEvent.MessageDelete,
    })
    .then(async (audit) => {
      const autor = message.author;

      const msg = message.content;

      if (!msg) return;

      const channelID = `1063309785098891394`;
      const Channel = await message.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Mensaje eliminado`)
        .addFields({ name: `Contenido del mensaje`, value: `${msg}` })
        .addFields({ name: `Canal del mensaje`, value: `${message.channel}` })
        .addFields({ name: `Autor del mensaje`, value: `${autor}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});


require("./Handlers/anticrash")(client);
client.on(Events.MessageUpdate, async (message, newMessage) => {
  message.guild
    .fetchAuditLogs({
      type: AuditLogEvent.MessageUpdate,
    })
    .then(async (audit) => {
      const autor = message.author;

      const msg = message.content;

      if (!msg) return;

      const channelID = `1063309785098891394`;
      const Channel = await message.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Mensaje editado`)
        .addFields({ name: `Mensaje inicial`, value: `${msg}` })
        .addFields({ name: `Mensaje editado`, value: `${newMessage}` })
        .addFields({ name: `Autor del mensaje`, value: `${autor}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});
