const app = require("express")();
const PORT = 8080;
const DAO = require("./DAO");
const cors = require("cors");


app.use(cors());

app.get("/all", (req, res) => {
  try {
    DAO.getAllData((err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send({
          STATUS: "OK",
          data: result,
        });
      }
    });
  } catch (err) {
    return res.status(500).send("Try after sometime"+ err);
  }
});

app.listen(PORT, () => console.log(`It's alive on http:localhost:${PORT}`));
