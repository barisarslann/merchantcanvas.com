import { lstat, realpath } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), ".."));
const imageDir = await realpath(join(root, "public", "images"));
const localPath = relative(root, imageDir);
if (localPath.startsWith(`..${sep}`) || localPath === ".." || resolve(root, localPath) !== imageDir) {
  throw new Error("Image output must stay inside the repository");
}

for (const name of ["multitier-campaign-rules", "multitier-analytics"]) {
  const input = join(imageDir, `${name}.jpg`);
  for (const width of [480, 800, 1130]) {
    const output = join(imageDir, `${name}-${width}.webp`);
    const existing = await lstat(output).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (existing?.isSymbolicLink()) throw new Error("Refusing symlink output");
    const info = await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(output);
    process.stdout.write(`${name}-${width}.webp: ${info.width}x${info.height}, ${info.size} bytes\n`);
  }
}
