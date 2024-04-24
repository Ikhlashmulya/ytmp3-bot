import path from "path";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import {Context} from "telegraf";

export async function download(ctx: Context, videoId: string): Promise<void> {
	const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
	
	const fileName = `${info.videoDetails.title.replace(/[\s/]/g, "_")}.mp3`;
	const outputFilePath = path.join("public/", fileName);
	const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`);

	ffmpeg(stream).audioBitrate(128).save(outputFilePath)
	.on("end", () => {
		console.log("file saved sending to user...")
		ctx.replyWithAudio({source: outputFilePath});
	}).on("error", err => console.log("err : "+ err));
}

