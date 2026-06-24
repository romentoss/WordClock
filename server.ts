import { getWorldTime } from "./clock.ts";

const HTML = await Deno.readTextFile("./index.html");

export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === "/" || path === "/index.html") {
    return new Response(HTML, {
      headers: { "Content-Type": "text/html" },
    });
  }

  if (path === "/mundosvg.svg") {
    const svg = await Deno.readTextFile("./mundosvg.svg");
    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  if (path === "/api/time") {
    const times = getWorldTime();
    return new Response(JSON.stringify({ times }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Not Found", { status: 404 });
}
