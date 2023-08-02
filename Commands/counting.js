const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SelectMenuBuilder,
    PermissionsBitField,
  } = require("discord.js");
  const ms = require("ms")
  
  
  module.exports = {
    category: "Setup",
    data: new SlashCommandBuilder()
      .setName("counting")
      .setDescription("Set the counting system")
      .addChannelOption(option => option
        .setName("channel").setRequired(true).setDescription("the channel"))
      .setDefaultMemberPermissions(
        PermissionFlagsBits.ManageChannels
      ),
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
async execute(interaction, Razen) {
   const channel = interaction.options.getChannel("channel")


   if(Razen.setups.get(interaction.guild.id, "counting")) {
Razen.setups.delete(interaction.guild.id, "counting")
    return interaction.reply("👍 Disabled the **Counting System**")
   }
   Razen.setups.ensure(interaction.guild.id, {
   
    numbers: {
        currentNumber: 0,
    maxCount: 0,
    lastCountedBy: null
    },
    channel: channel.id,
   }, "counting")

   interaction.reply("👍 Enabled the **Counting System**")

}
  }
