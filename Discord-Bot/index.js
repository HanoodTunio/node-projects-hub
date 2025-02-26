require("dotenv").config();
const { Client, GatewayIntentBits, Integration } = require("discord.js");

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

client.on("interactionCreate", (interaction) => {
    console.log(interaction);
    interaction.reply("Pong!!")
})

client.login(process.env.DISCORD_BOT_TOKEN);
