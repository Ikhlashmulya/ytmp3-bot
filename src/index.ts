import {config} from "dotenv";
import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";
import {download} from "./downloader";
//import path from "path";

config();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token!);

bot.start((ctx) => ctx.reply("Hello"));
bot.command("test", async (ctx) => {
	ctx.replyWithAudio({source: "public/atarayo.mp3"});
});
bot.on(message("text"), async (ctx) => {
	const dataUrl = ctx.text.split("/");
	let fileName: string = "";

	if (dataUrl.length <= 2) {
		ctx.reply("link is invalid!!");
		return;
	}

	if (dataUrl[2] == "youtu.be") {
		const id = dataUrl[3].split("?")[0];
		fileName = await download(id);
	} else if (dataUrl[2] == "youtube.com" || dataUrl[2] == "m.youtube.com") {
		let id: string = "";
		dataUrl[3].split("?")[1].split("&").forEach(value => {
			if (value.startsWith("v=")) {
				id = value.substring(2, value.length);
			}
		});
		fileName = await download(id);
	} else {
		ctx.reply("link is invalid!!");
	}

	ctx.replyWithAudio({source: `public/${fileName}`});
});

console.log("bot is running");

bot.launch();

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

