require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("create")
        .setDescription("Get instructions to create a short URL"),
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log("🔄 Registering slash commands...");

        await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), { body: commands });

        console.log("✅ Slash commands registered successfully.");
    } catch (error) {
        console.error("❌ Error registering commands:", error);
    }
})();
