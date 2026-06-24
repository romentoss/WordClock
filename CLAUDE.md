# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: World Clock - Deno + Temporal API Demo

Educational project demonstrating Temporal API vs native Date, and Deno vs Node.js runtime.

## Architecture

- **Frontend**: Single HTML file (`index.html`) with embedded CSS and JavaScript
- **Backend**: Deno server (`main.ts`, `server.ts`, `clock.ts`)
- **Static Asset**: SVG world map (`mundosvg.svg`)
- **Deployment**: Deno Deploy (serverless)

## Running Locally

```bash
# Start Deno server (requires Deno installed)
deno run --allow-net --allow-read main.ts
# Server runs on http://localhost:8080
```

## Key Files

- `index.html` - Frontend with world clock UI, fetches from `/api/time`
- `main.ts` - Entry point, Deno.serve handler
- `server.ts` - HTTP handler for routes: `/`, `/mundosvg.svg`, `/api/time`
- `clock.ts` - Temporal API logic for getting world times
- `mundosvg.svg` - World map image for globe display

## Temporal API Usage

```typescript
import { Temporal } from "@js-temporal/polyfill";

// Create zoned datetime
const now = Temporal.Now.zonedDateTimeISO();

// Convert to different timezone
const tokio = now.withTimeZone("Asia/Tokyo");

// Immutable operations (returns new object)
const tomorrow = now.add({ days: 1 });
```

## Deno vs Node.js Key Differences

| Feature | Node.js | Deno |
|---------|---------|------|
| TypeScript | Needs build step | Native |
| Dependencies | package.json + npm | URL imports |
| Permissions | Full access by default | Sandboxed (--allow-net, etc.) |
| Tooling | Separate CLI tools | Built-in (test, fmt, lint) |

## Temporal API Status

- **Stage 3 Proposal** (TC39) - Not finalized yet
- Polyfill available: `@js-temporal/polyfill`
- Used for immutable date/time operations with timezone support

## API Response Format

```json
{
  "times": [{
    "city": "Madrid",
    "country": "España",
    "timezone": "Europe/Madrid",
    "hour": 19,
    "minute": "56",
    "second": "22",
    "dayPeriod": "PM",
    "date": "miércoles, 24 de junio de 2026"
  }]
}
```
