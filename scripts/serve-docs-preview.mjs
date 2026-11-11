import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";

// A loopback-only static export preview. Never reads outside this repository.
const repository = await realpath(new URL("..", import.meta.url));
const root = await realpath(path.join(repository, "out"));
const inside = (value) => value.startsWith(`${root}${path.sep}`) || value === root;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".ttf": "font/ttf", ".vtt": "text/vtt; charset=utf-8", ".md": "text/plain; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const target = path.resolve(root, `.${pathname}`);
    if (!inside(target)) throw new Error("Invalid path");
    const candidates = [target, `${target}.html`, path.join(target, "index.html")];
    for (const candidate of candidates) {
      if (!inside(candidate)) continue;
      try {
        const resolved = await realpath(candidate);
        if (!inside(resolved) || !(await stat(resolved)).isFile()) continue;
        const body = await readFile(resolved);
        response.writeHead(200, { "content-type": types[path.extname(resolved)] || "application/octet-stream", "cache-control": "no-store" });
        response.end(request.method === "HEAD" ? undefined : body);
        return;
      } catch { /* Try static-export alternatives. */ }
    }
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    response.end(await readFile(path.join(root, "404.html")));
  } catch {
    response.writeHead(400);
    response.end("Invalid request");
  }
}).listen(4320, "127.0.0.1", () => process.stdout.write("Docs preview: http://127.0.0.1:4320/docs/multitier-discounts\n"));
