const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   * @param {import("discord.js").Message} message
   * @param {import("../../Structures/bot")} Razen //Your client
   */
  async execute(message, Razen) {

    
    if(Razen.setups.has(message.guild.id)) {
        if(Razen.setups.get(message.guild.id, "counting")) {
          const countingChanneld = await Razen.setups.get(message.guild.id, "counting")
          if (countingChanneld && message.channel.id === Razen.setups.get(message.guild.id, "counting.channel")) {
            const countingChannel = await Razen.setups.get(message.guild.id, "counting.channel");
            const lastCountedBy = countingChanneld.numbers.lastCountedBy;
            const nextNumber = countingChanneld.numbers.currentNumber + 1;
          
            if (message.author.bot) return;
          if(!Number(message.content)) {
            return message.delete().catch(() => {})
          }
            if (Number(message.content) === nextNumber) {
              if (message.author.id === lastCountedBy) {
                const waitMessage = `Please wait for someone else to say \`${nextNumber}\``;
                await message.reply({
                  embeds: [new EmbedBuilder()
                    .setAuthor({ name: "It's not your turn yet 😔", iconURL: message.author.avatarURL() })
                    .setDescription(`❌ ${waitMessage}`)
                    .setColor("Red")
                    .setTimestamp()
                  ]
                });
              } else {
                const updateObject = {
                  currentNumber: nextNumber,
                  lastCountedBy: message.author.id
                };
                
                if (countingChanneld.numbers.maxCount < nextNumber) {
                  updateObject.maxCount = nextNumber;
                }
          
                Razen.setups.set(message.guild.id, updateObject, "counting.numbers");
                await message.react("🟢").catch(() => {});
              }
            } else {
              if (message.author.id === lastCountedBy) {
                const waitMessage = `Please wait for someone else to say \`${nextNumber}\``;
                await message.reply({
                  embeds: [new EmbedBuilder()
                    .setAuthor({ name: "It's not your turn yet 😔", iconURL: message.author.avatarURL() })
                    .setDescription(`❌ ${waitMessage}`)
                    .setColor("Red")
                    .setTimestamp()
                  ]
                });
              } else {
                Razen.setups.set(message.guild.id, 0, "counting.numbers.currentNumber");
                await message.react("❌").catch(() => {});
                const waitMessage = `Please wait for someone else to say \`1\``;
                await message.reply({
                  embeds: [new EmbedBuilder()
                    .setAuthor({ name: "You ruined it 🤦‍♂️", iconURL: message.author.avatarURL() })
                    .setDescription(`❌ Restarted the count from \`0\`. ${waitMessage}`)
                    .setColor("Red")
                    .setTimestamp()
                  ]
                });
              }
            }
          }
        }
        
      }
  },
};
