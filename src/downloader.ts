import path from "path";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

export async function download(videoId: string): Promise<string> {
	const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
	
	const fileName = `${info.videoDetails.title}.mp3`;
	//	const outputFilePath = path.join(__dirname+"/../public/atarayo.mp3");
	const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`);
//	const outputFile = fs.createWriteStream(outputFilePath); 

	/*
	ffmpeg(stream)
	.toFormat("mp3")
	.on("error", err => console.log("err : "+err))
	.on("end", () => console.log("finished"))
	.pipe(outputFile)
	.on("error", err => console.log("err : "+err))
	.on("finished", () => console.log("file saved"));
	*/ 

 ffmpeg(stream).audioBitrate(128).save(path.join(__dirname, "..", "public", "atarayo.mp3")).on("end", () => console.log("file saved")).on("error", err => console.log("err : "+ err));

	return fileName;
}

