import { Client, GatewayIntentBits } from "discord.js";

import config from "./config.js";
import commands from "./commands.js";
import { getQuestionAnswer } from "./utils.js";

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

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.channel.id === config.channelId) {
        const number = message.content.match(/\d+/);
        if (number) {
            const questionNumber = parseInt(number[0]);
            const answer = await getQuestionAnswer(questionNumber);

            if (!answer) {
                message.reply("Nie ma takiego pytania misiek.");
                return;
            }

            const ping = answer !== "Nie udało się pobrać odpowiedzi.";

            const content = ping ? `<@&${config.roleId}>\n${answer}` : answer;

            message.channel.send(content);
        }
    }
});

client.login(config.token).then(() => {
    console.log("Logged in as " + client.user.tag);
});
