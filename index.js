const db = require("./infra/database.js");
const cors = require("cors"); // cors add to enable crossed requisitions
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const porta = process.env.PORT || 8080; // change this part for it to capture the environment, in order to use the right port

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const recordistas = await db.consulta();
  res.status(200).send(recordistas);
});

app.post("/", async (req, res) => {
  try {
    let referer = req.get("referer"); //get the value of the referer of the request

    if (referer !== "https://ramonmelo.com.br/") {
      res.status(403).send("Não autorizado!");
      console.log("Não autorizado!");
      return;
    }
    const { nome, pontuacao } = req.body;
    console.log(`nome: ${nome}
    pontuacao: ${pontuacao}`);

    //let nomeSanitizado = nome.replace(/[^a-zA-Z0-9\sçáéíâêãõ]/g, ""); // sanitização da variável nome para que caracteres especiais não sejam lidos

    console.log(`adicionando ${nome} a lista de recordistas ...`);
    await db.registro(nome, pontuacao);

    res.status(200).send(`Recordista ${nome} inserido!`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro no servidor, aguarde o problema ser resolvido!");
  }
});

app.use((req, res) => {
  // the middleware needs to be in the end to for the express search the requisitions in sequential order
  res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(porta, console.log("API disponível"));
