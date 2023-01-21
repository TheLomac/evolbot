const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client } = require('discord.js');

const { loadCommands } = require(`../../Handlers/commandHandler`);
const { loadEvents } = require(`../../Handlers/eventHandler`);
const { loadButtons } = require(`../../Handlers/buttonHandler`);

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName(`reload`)
    .setDescription(`Comando para recargar los comandos/eventos`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName(`eventos`).setDescription(`recargar eventos`))
    .addSubcommand((options) => options.setName(`comandos`).setDescription(`recargar comandos`))
    .addSubcommand((options) => options.setName(`botones`).setDescription(`recargar botones`)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */


    execute(interaction, client){
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "eventos": {
                for (const [key, value] of client.events)
                client.removeListener(`${key}`, value, true,);
                loadEvents(client);
                interaction.reply({content:"Los eventos fueron recargados exitosamente", ephemeral: true,});
            }
                
                break;
            case "comandos":{
                loadCommands(client);
                interaction.reply({content:"Los comandos fueron recargados exitosamente", ephemeral: true,});

            }
                break;
                case "botones":{
                    loadButtons(client);
                    interaction.reply({content:"Los botones fueron recargados exitosamente", ephemeral: true,});
    
                }
                    break;
        }
    },

};