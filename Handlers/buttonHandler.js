async function loadButtons(client){
    const { loadFiles } = require("../Functions/fileloader");

    await client.buttons.clear();

    const Files = await loadFiles("botones");


    Files.forEach((file) => {
        const button = require(file);
        client.buttons.set(button.data.name, button);

    });

    return console.log("Botones Cargados");

}


module.exports = { loadButtons };