const fs = require("fs");

module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies" && id) {
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    const isFound = data.find((i) => i.id === id);

    if (!isFound) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "ID GEÇERSİZ" }));
    }

    const filtered = data.filter((item) => item.id !== id);

    fs.writeFileSync("./data/movies.json", JSON.stringify(filtered, null, 2));

    res.writeHead(204);
    return res.end();
  } else {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "yol bulunamadı" }));
  }
};
