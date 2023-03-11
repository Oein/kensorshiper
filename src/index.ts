import { ActivityType, Client } from "discord.js";
import kensorship from "kensorship";

import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: ["MessageContent", "GuildMessages", "Guilds", "DirectMessages"],
});

client.on("ready", () => {
  client.user!.setActivity(`FWordㅣKensorshiperㅣ${process.env.VER}`, {
    type: ActivityType.Watching,
  });
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("messageCreate", (msg) => {
  const result = kensorship(msg.content);
  if (result.length > 0)
    return msg.author
      .send({
        content: `금지어를 사용하지 말아주세요! 사용한 금지어 : ||${result[0].badword}||`,
      })
      .then(() => {
        msg.delete().catch(() => {});
      })
      .catch(() => {});
});

client.login(process.env.TOKEN);
