const fs = require("fs");
const csv = require("csv-parser");

if (!fs.existsSync("./canada.txt") && !fs.existsSync("./usa.txt")) {
  fs.createReadStream("./input_countries.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.country === "Canada" && !fs.existsSync("./canada.txt")) {
        fs.appendFile(
          "./canada.txt",
          ` country: ${row.country} year: ${row.year} pop: ${row.population} |`,
          function (err) {
            if (err) {
              console.log(err);
            }
            console.log("can saved");
          }
        );
      }
      if (row.country === "United States") {
        fs.appendFile(
          "./usa.txt",
          ` country: ${row.country} year: ${row.year} pop: ${row.population} |`,
          function (err) {
            if (err) {
              console.log(err);
            }
            console.log("usa saved");
          }
        );
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}
