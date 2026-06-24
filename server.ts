import { getWorldTime } from "./clock.ts";

const HTML = await Deno.readTextFile("./index.html");
const SVG = await Deno.readTextFile("./mundosvg.svg");

export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === "/" || path === "/index.html") {
    return new Response(HTML, {
      headers: { "Content-Type": "text/html" },
    });
  }

  if (path === "/mundosvg.svg") {
    return new Response(SVG, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  if (path === "/api/time") {
    try {
      const times = getWorldTime();
      return new Response(JSON.stringify({ times }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Not Found", { status: 404 });
}
