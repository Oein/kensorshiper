import { Client } from "discord.js";
import kensorship from "kensorship";

import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: ["MessageContent", "GuildMessages", "Guilds", "DirectMessages"],
});

client.on("ready", () => {
  client.user.setActivity(
    "k.정보 를 통해 봇의 정보 및 명령어를 확인할수 있습니다",
    { type: "PLAYING" }
  );
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.content == "k.정보")
    return msg.reply({
      content: `버전 : ${process.env.VER}\n개발자\n> Oein (<https://github.com/Oein>)\n> Sangho129 (<https://github.com/sangho129>)\n사용법\n해당봇은 특별한 명령어가 없으며 메시지 관리 권한이 있을경우 비속어를 차단합니다!`,
    });

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
