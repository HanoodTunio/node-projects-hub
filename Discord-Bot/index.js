require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const shortid = require("shortid");
const URL = require("./models/url"); // Import URL model

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/discord-short-url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Handle Messages
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // Command: Create Short URL
    if (message.content.startsWith("!create ")) {
        const url = message.content.split(" ")[1]; // Extract URL

        if (!url || !url.startsWith("http")) {
            return message.reply("❌ Please provide a valid URL.");
        }

        const shortID = shortid.generate();
        await URL.create({ shortID, redirectURL: url });

        return message.reply(`✅ Your Short URL: **http://localhost:3000/${shortID}** (Click to Open)`);
    }

    // Command: Get Original URL
    if (message.content.startsWith("!get ")) {
        const shortID = message.content.split(" ")[1];

        const urlEntry = await URL.findOne({ shortID });

        if (!urlEntry) {
            return message.reply("❌ No URL found for this ID.");
        }

        return message.reply(`🔗 Original URL: ${urlEntry.redirectURL}`);
    }
});

client.on("ready", () => {
    console.log(`🚀 Bot is running as ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
