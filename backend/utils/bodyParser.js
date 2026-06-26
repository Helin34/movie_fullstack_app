module.exports = (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      // Veri parçaları geldikçe body'e ekle
      request.on("data", (chunk) => {
        body += chunk;
      });

      // Veri akışı bittiğinde
      request.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          // JSON parse hatası oluşursa
          reject(err);
        }
      });

      // Bağlantı hatası oluşursa
      request.on("error", (err) => {
        reject(err);
      });
    } catch (err) {
      // Promise kurulumunda bir hata olursa
      reject(err);
    }
  });
};
