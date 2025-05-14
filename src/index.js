import { Client, GatewayIntentBits } from "discord.js";

import config from "./config.js";
import commands from "./commands.js";

const client = new Client({ intents: Object.values(GatewayIntentBits) });

client.on("ready", async () => {
    console.log("Bot is ready!");

    const guild = client.guilds.cache.get(config.guildId);

    guild.commands.set(commands).then(() => {
        console.log("Commands registered!");
    });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.find(
        (cmd) => cmd.name === interaction.commandName
    );

    if (!command) return;

    await interaction.deferReply();

    try {
        const response = await command.run({ client, interaction });
    } catch (error) {
        console.error(error);
        await interaction.editReply("Panie majster wyjebało błąd.");
    }
});

client.login(config.token).then(() => {
    console.log("Logged in as " + client.user.tag);
});
