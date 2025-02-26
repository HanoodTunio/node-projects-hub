require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "create",
        description: "Create a new Short URL",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands...");

        const data = await rest.put(
            Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), // Global Commands
            { body: commands }
        );

        console.log(`✅ Successfully registered ${data.length} commands.`);
        console.log("Registered Commands:", data);
    } catch (error) {
        console.error("❌ Error registering commands:", error);
    }
})();
