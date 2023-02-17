import { Client, EmbedBuilder, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);

const serverId = "1074745929720148108";
const channelId = "1074745930395435098";
const rulesChannelID = "1074745930210881567";

const autoroles = [
  { name: "Andalucía", emoji: "🌵", roleId: "1075085102427680799" },
  { name: "Aragón", emoji: "🦅", roleId: "1075086255311835247" },
  { name: "Asturias", emoji: "🍎", roleId: "1075087140834259035" },
  { name: "Cantabria", emoji: "🌲", roleId: "1075085695175118849" },
  { name: "Castilla-La Mancha", emoji: "🐂", roleId: "1075086344352706663" },
  { name: "castilla y león", emoji: "🦌", roleId: "1075086395523215443" },
  { name: "cataluña", emoji: "🍊", roleId: "1075085871876931715" },
  { name: "Comunidad de Madrid", emoji: "🏰", roleId: "1075086550578253865" },
  { name: "Navarra", emoji: "🏹", roleId: "1075086096532242532" },
  { name: "Comunidad Valenciana", emoji: "🌴", roleId: "1075086460153241640" },
  { name: "Extremadura", emoji: "🌳", roleId: "1075086508354195538" },
  { name: "Galicia", emoji: "🐟", roleId: "1075085941594673273" },
  { name: "La rioja", emoji: "🍇", roleId: "1075086050013216839" },
  { name: "País Vasco", emoji: "🦆", roleId: "1075086147677593651" },
  { name: "Región de Murcia", emoji: "🐓", roleId: "1075086688432443392" },
];

client.on("ready", async () => {
  console.log(`El bot está conectado como ${client.user.tag}!`);

  const server = client.guilds.cache.get(serverId);
  const channel = server.channels.cache.get(channelId);
  const rulesChannel = server.channels.cache.get(rulesChannelID);

  console.log(`server: ${server}`);
  console.log(`channel: ${channel}`);

  // Buscamos el mensaje de autoroles en el canal
  const messages = await channel.messages.fetch();
  const autorolesMessage = messages.find(
    (m) =>
      m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].title === "Autoroles"
  );

  const rulesMessage = messages.find(
    (m) =>
      m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].title === "RAZONES DE MUTEO"
  );

  // Si el mensaje no existe, lo enviamos
  if (!autorolesMessage) {
    const embed = new EmbedBuilder()
      .setTitle("Autoroles")
      .setDescription(
        "Reacciona con el emoji correspondiente para recibir el rol:"
      )
      .setColor("#0099ff")
      .addFields(
        { name: "Andalucía", value: "🌵", inline: true },
        { name: "Aragón", value: "🦅", inline: true },
        { name: "Asturias", value: "🍎", inline: true },
        { name: "Islas Baleares", value: "🏝️", inline: true },
        { name: "Canarias", value: "🏝️", inline: true },
        { name: "Cantabria", value: "🌲", inline: true },
        { name: "Castilla-La Mancha", value: "🐂", inline: true },
        { name: "Castilla y León", value: "🦌", inline: true },
        { name: "Cataluña", value: "🍊", inline: true },
        { name: "Comunidad de Madrid", value: "🏰", inline: true },
        { name: "Comunidad Foral de Navarra", value: "🏹", inline: true },
        { name: "Comunidad Valenciana", value: "🌴", inline: true },
        { name: "Extremadura", value: "🌳", inline: true },
        { name: "Galicia", value: "🐟", inline: true },
        { name: "La Rioja", value: "🍇", inline: true },
        { name: "País Vasco", value: "🦆", inline: true },
        { name: "Región de Murcia", value: "🐓", inline: true }
      );
    const sentMessage = await channel.send({ embeds: [embed] });
    console.log("Message sent successfully");
    for (const autorol of autoroles) {
      await sentMessage.react(autorol.emoji);
    }
  } else if (!rulesMessage) {
    const mutuoembed = new EmbedBuilder()
      .setTitle("RAZONES DE MUTEO")
      .setColor("#FF0000")
      .setThumbnail(
        "https://cdn.discordapp.com/icons/123456789012345678/abcdefg.png"
      )
      .setDescription(
        "Estas son las razones por las que puedes ser muteado en este servidor:"
      )
      .addFields(
        {
          name: "Next Dates: 1', 'Gritar, soplar, usar modulador o reproducir sonidos molestos a partir de tu micrófono en canales de voz.  10h",
          value: "🌵",
          inline: true,
        },
        {
          name: "Next Dates: 2', 'Peleas y discusiones en texto o canales de voz.  10h",
          value: "🦅",
          inline: true,
        },
        {
          name: "Next Dates: 3', 'Hacer flood de mensajes.  10h",
          value: "🍎",
          inline: true,
        },
        {
          name: "Next Dates: 4', 'Contactar con un miembro del STAFF mediante mensaje privado es un muteo, seguido de un baneo, para esto tenemos nuestro propio canal; │soporte  10h",
          value: "🏝️",
          inline: true,
        },
        {
          name: "Next Dates: 5', 'Intento de comandos de moderación (!ban !mute !warn, @everyone, etc)  2h",
          value: "🏝️",
          inline: true,
        },
        {
          name: "Next Dates:6 ', 'Utilizar emoticonos epilépticos.  	2h ",
          value: "🌲",
          inline: true,
        },
        {
          name: "Next Dates:7 ', 'Abusar de comandos de texto (ej: el uso de negritas, subrayado, cursiva, etc.)  	2h ",
          value: "🦌",
          inline: true,
        },
        {
          name: "Next Dates:8 ', 'Flood de reacciones a mensajes.  	2h ",
          value: "🐟",
          inline: true,
        },
        {
          name: "Next Dates:9 ', 'Spoilers (según la gravedad, quedará a juicio del staff la duración de la sanción)  	10h-2d ",
          value: "🐓",
          inline: true,
        }
      )
      .setFooter({
        text: "COMO AVISO PREVIO, EL STAFF PODRÁ MUTEARTE 10min PARA PARAR LA ACCIÓN. EN CASO DE REINCIDENCIA, SE APLICARÁN SANCIONES MAYORES.\nTras leer las normas hay que usar el sentido común. No está en las reglas no es una excusa válida.",
      });
    rulesChannel.send({ embeds: [mutuoembed] });
  } else {
    console.log("Autoroles message already exists");
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  console.log("entra");
  // Check if the reaction is on the autorole message and not added by the bot
  if (reaction.message.channel.id === channelId && user.id !== client.user.id) {
    const autorol = autoroles.find((a) => a.emoji === reaction.emoji.name);
    if (autorol) {
      const member = await reaction.message.guild.members.fetch(user.id);
      member.roles.add(autorol.roleId).catch(console.error);
      console.log(`Assigned role ${autorol.name} to ${member.user.tag}`);
    }
  }
});
