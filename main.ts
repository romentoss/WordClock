import { handleRequest } from "./server.ts";

Deno.serve((req) => handleRequest(req));
