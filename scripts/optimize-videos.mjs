import { mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const videos = [
  {
    input: new URL("../src/assets/hero/apple-hero-source.mp4", import.meta.url),
    outputDirectory: new URL("../src/assets/hero/", import.meta.url),
    name: "apple-hero",
  },
  {
    input: new URL("../src/assets/difference/zoom-demo-source.mp4", import.meta.url),
    outputDirectory: new URL("../src/assets/difference/", import.meta.url),
    name: "zoom-demo",
  },
];
const requestedName = process.argv[2];

if (!ffmpegPath) {
  throw new Error("ffmpeg-static did not provide a binary for this platform.");
}
const ffmpegExecutable = ffmpegPath;

/**
 * @param {URL} input
 * @param {URL} output
 * @param {string[]} args
 */
function transcode(input, output, args) {
  const result = spawnSync(
    ffmpegExecutable,
    [
      "-hide_banner",
      "-y",
      "-i",
      fileURLToPath(input),
      "-an",
      "-vf",
      "scale='min(1600,iw)':-2:flags=lanczos,fps=30",
      ...args,
      fileURLToPath(output),
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

for (const { input, outputDirectory, name } of videos) {
  if (requestedName && requestedName !== name) {
    continue;
  }
  mkdirSync(outputDirectory, { recursive: true });

  transcode(input, new URL(`${name}.webm`, outputDirectory), [
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "34",
    "-b:v",
    "0",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
    "-row-mt",
    "1",
  ]);

  transcode(input, new URL(`${name}.mp4`, outputDirectory), [
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "24",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
  ]);

  transcode(input, new URL(`${name}-poster.jpg`, outputDirectory), ["-frames:v", "1", "-q:v", "3"]);
}
