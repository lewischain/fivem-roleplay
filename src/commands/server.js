const { EmbedBuilder, Colors } = require("discord.js");
const gamedig = require("gamedig");

module.exports = {
  name: "sunucu",
  description: "Fivem sunucunuzun genel bilgilerini sizlere gösterir.",
  options: [
    {
      type: 1,
      name: "bilgi",
      description: "Fivem sunucunuzun genel bilgilerini sizlere gösterir."
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    const server = config.server;
    
    const samp = await gamedig.query({
      type: "fivem",
      host: server.ip || "94.23.68.73",
      port: server.port || "22003",
    });
    
    console.log(samp)
    
    const embed = new EmbedBuilder()
    .setColor(config.color || 0x2F3136)
    .setAuthor({ name: `${samp.name}`, iconURL: `${guild.iconURL()} ` })
    .addFields([
      {
        name: "Harita:",
        value: "```"+samp.raw.mapname+"```",
        inline: true
      },
      {
        name: "Oyun versiyon:",
        value: "```"+samp.raw.protocol+"```",
        inline: true
      },
      {
        name: "Geliştirici:",
        value: "```"+"Belirsiz"+"```",
        inline: true
      },
      {
        name: "Oyuncular:",
        value: "```"+samp.raw.clients+"/"+samp.raw.sv_maxclients+"```",
        inline: true
      },
      {
        name: "Ping:",
        value: "```"+samp.ping+"ms```",
        inline: true
      },  
      {
        name: "IP adresi:",
        value: "```"+samp.connect+"```",
        inline: true
      }
    ])
    .setTimestamp()
    .setFooter({ text: `${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
    
    interaction.followUp({ embeds: [embed] })
  }
}