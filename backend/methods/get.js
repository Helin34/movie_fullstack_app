const fs = require("fs");

module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  const id = req.url.split("/")[3];

  // Dosyayı okuyup doğrudan diziye parse ediyoruz
  const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

  if (req.url === "/api/movies") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(movies));
  } else if (baseUrl === "/api/movies" && id) {
    // Doğrudan 'movies' dizisi içinde arama yapıyoruz
    const movie = movies.find((m) => m.id === id);

    if (movie) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(movie));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Bu ID ile film bulunamadı" }));
    }
  } else {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Yol bulunamadı" }));
  }
};
