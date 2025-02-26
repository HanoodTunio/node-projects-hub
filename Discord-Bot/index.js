require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

console.log("TOKEN:", process.env.DISCORD_BOT_TOKEN); // Debugging output
console.log("CLIENT ID:", process.env.DISCORD_BOT_CLIENT_ID);

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    message.reply({
        content: "Hi From Bot!",
    });
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});



client.login(process.env.DISCORD_BOT_TOKEN);
