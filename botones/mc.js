module.exports = {
    data: {
        name: "mc",
    },
    async execute(interaction, client) {
    

        const user = interaction.guild.roles.cache.get(`1067859923586785290`);
        const role = interaction.member.roles.cache.has(user.id);
       if(role) return interaction.member.roles.remove(user).then((member) => 
        interaction.reply({
            content: `El rol ${user} se te ha removido`, 
            ephemeral: true
        })
        
    
    ); 

   /* if(role) interaction.reply({
            content: `Ya tienes el rol ${user}`, 
            ephemeral: true
        }) */

        return interaction.member.roles.add(user)
        .then((member) => 
        interaction.reply({
            content: `El rol ${user} se te ha aplicado`, 
            ephemeral: true
        })
        
    
    );

    },
};