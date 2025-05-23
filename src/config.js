import "dotenv/config";

export default {
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.GUILD_ID,
    channelId: process.env.CHANNEL_ID,
    roleId: process.env.ROLE_ID,

    baseUrl: "https://zawodowe.edu.pl/",
    pageUrl: "https://zawodowe.edu.pl/technik-programista/INF.03/page/",
};
