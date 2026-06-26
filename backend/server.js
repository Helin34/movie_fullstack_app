const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // Yolun /api/movies ile başlayıp başlamadığını kontrol edelim
  if (req.url.startsWith("/api/movies")) {
    switch (req.method) {
      case "OPTIONS":
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, DELETE, PUT, PATCH, OPTIONS",
        );

        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.end();
        break;
      case "GET":
        getRequest(req, res);
        break;
      case "POST":
        postRequest(req, res);
        break;
      case "DELETE":
        deleteRequest(req, res);
        break;
      default:
        res.statusCode = 405; // Metot desteklenmiyor
        res.end(JSON.stringify({ message: "Metot desteklenmiyor" }));
    }
  } else {
    // Tanımlı olmayan yollar için
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Rota bulunamadı" }));
  }
});
const port = 5005;
server.listen(port, () => {
  console.log(`Server ${port}'a gelen istekleri dinlemeye başladı.`);
});
