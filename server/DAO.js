const fs = require("fs");

const getAllData = function (done) {
  fs.readFile("./CoffeeData.json", "utf-8", (err, data) => {
    if (err) {
      return done(err, undefined);
    } else {
      return done(undefined, JSON.parse(data));
    }
  });
};

module.exports = { getAllData };
