const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      const body = await bodyParser(req);

      if (
        !body.title ||
        !body.year ||
        !body.rating ||
        !body.genre ||
        body.genre.length === 0
      ) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({ message: "Lütfen tüm film alanlarını doldurun." }),
        );
      }

      body.id = crypto.randomUUID();

      let data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

      data.push(body);

      fs.writeFileSync("./data/movies.json", JSON.stringify(data, null, 2));

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(body));
    } catch (error) {
      console.error("POST Hatası:", error);
      res.writeHead(500);
      return res.end(JSON.stringify({ message: "Sunucu hatası oluştu" }));
    }
  }
};
