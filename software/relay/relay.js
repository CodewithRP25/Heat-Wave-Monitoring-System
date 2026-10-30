
const http = require("http");

const PORT = 3001;
const PP_API = "http://localhost:3000/api/sensor-data";

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "OK" }));
  }

  if (req.method !== "POST" || req.url !== "/api/sensor-data") {
    res.writeHead(404);
    return res.end("Not found");
  }

  let body = "";

  req.on("data", chunk => {
    body += chunk;
    if (body.length > 10000) req.destroy();
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);

      const response = await fetch(PP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.text();

      res.writeHead(response.status, {
        "Content-Type": "application/json"
      });
      res.end(result);
    } catch (error) {
      console.error("Relay error:", error.message);
      if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Backend forwarding failed" }));
      }
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Relay running on port ${PORT}`);
});
