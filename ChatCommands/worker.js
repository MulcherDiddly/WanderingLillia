import adventuresText from "./Adventures.txt?raw";

const adventures = adventuresText
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/adventure") {
      const pick = adventures[Math.floor(Math.random() * adventures.length)];
      return new Response(pick);
    }

    if (url.pathname === "/dig") {
      const user = url.searchParams.get("user") ?? "Someone";
      const roll = Math.floor(Math.random() * 1000) + 1;

      if (roll === 1000) {
        return new Response(`${user} has found the GOLDEN SHROOMY! `);
      }

      return new Response(`${user} has found a regular shroomy.`);
    }

    return new Response("Not found", { status: 404 });
  }
};