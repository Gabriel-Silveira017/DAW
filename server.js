const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "aqui informamos quais urls permitimos que sejam conectadas ao nosso backend. Quando tivermos um frontend, iremos alterar para a url do nosso frontend",
}

app.get("/", function(req, res){
    res.send("Desenvolvimento de Aplicações WEB II")
});

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require("./models");
db.sequelize
  .sync({ alter: true })
  .then( () => {
    console.log("Synced db.")
  })

  .catch((err) => {
    console.log("Failed to sync db: " + err.message)
  });

app.listen(8000, function(req, res){
    console.log("app rodando na porta 8000")
});