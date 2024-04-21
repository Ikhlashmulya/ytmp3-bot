import path from "path";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

export default function download(videoId: string, fileName: string) {
	const outputFile = path.join("public", `${fileName}.mp3`);

	const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {filter: "audioonly"});
	
	ffmpeg(stream)
	.toFormat("mp3")
	.on("error", err => console.log("err : "+err))
	.on("end", () => console.log("finished"))
	.pipe(fs.createWriteStream(outputFile))
	.on("err", err => console.log("err : "+err))
	.on("finished", () => console.log("file saved"));
}
