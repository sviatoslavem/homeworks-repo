import http from "http";

const getRandomDelay = () => Math.floor(Math.random() * 2000) + 1000;

const isError = () => Math.floor(Math.random() * 10) === 0;

const server = http.createServer((req, res) => {
  const delay = getRandomDelay();

  if (isError()) {
    setTimeout(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }, delay);
    console.log(`500 ERROR - ${req.method} ${req.url} (затримка: ${delay} мс)`);
    return;
  }

  setTimeout(() => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running");
    console.log(`200 OK - ${req.method} ${req.url} (затримка: ${delay} мс)`);
  }, delay);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
