module.exports = {
    data: {
        name: "ver",
    },
    async execute(interaction, client) {
    

        const user = interaction.guild.roles.cache.get(`1066314187179053076`);

        return interaction.member.roles.add(user)
        .then((member) => 
        interaction.reply({
            content: `El rol ${user} se te ha aplicado`, 
            ephemeral: true
        })
    
    );

    },
};