import path from "path";
import ytdl from "ytdl-core";
//import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import {Context} from "telegraf";

export async function download(ctx: Context, videoId: string): Promise<void> {
	const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
	
	const fileName = `${info.videoDetails.title.replace(/[ \/]/g, "_")}.mp3`;
	console.log("downloading : "+fileName);
	const outputFilePath = path.join("public/", fileName);

	if(fs.existsSync(outputFilePath)) {
		ctx.replyWithAudio({source: outputFilePath});
		return;
	}

	const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {filter: "audioonly", quality: "highestaudio"});

	stream.pipe(fs.createWriteStream(outputFilePath)).on("finish", () => {
		ctx.reply("download complete, sending audio file...");
		ctx.replyWithAudio({source: outputFilePath});
	});

}

