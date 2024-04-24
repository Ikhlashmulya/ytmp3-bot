import {config} from "dotenv";
import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";
import {download} from "./downloader";

config();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token!);

bot.start((ctx) => ctx.reply("Hello...!! send me link from youtube..!"));
bot.on(message("text"), async (ctx) => {
	const dataUrl = ctx.text.split("/");

	if (dataUrl.length <= 2) {
		ctx.reply("link is invalid!!");
		return;
	}

	if (dataUrl[2] == "youtu.be") {
		const id = dataUrl[3].split("?")[0];
		await download(ctx, id);
	} else if (dataUrl[2] == "youtube.com" || dataUrl[2] == "m.youtube.com" || dataUrl[2] == "music.youtube.com") {
		let id: string = "";
		dataUrl[3].split("?")[1].split("&").forEach(value => {
			if (value.startsWith("v=")) {
				id = value.substring(2, value.length);
			}
		});
		await download(ctx, id);
	} else {
		ctx.reply("link is invalid!!");
	}

});

console.log("bot is running");

bot.launch();

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

