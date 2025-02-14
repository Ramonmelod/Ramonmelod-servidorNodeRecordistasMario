(async () => {
  const db = require("./db.js"); // inclusão arquivo db.js
  const cors = require("cors"); // pacote cors: utilzado para permissão de requisições cruzadas
  const bodyParser = require("body-parser"); // incluído para analise das requisições de post

  const express = require("express");
  const app = express();
  const porta = process.env.PORT || 8080; // change this part for it to capture the environment, in order to use the right port

  app.use(cors()); //uso do cors
  app.use(bodyParser.json()); // uso do body-Parser json

  app.get("/", async (req, res) => {
    // rota para requisição da lista de recordistas
    const recordistas = await db.consulta(); // aqui
    res.status(200).send(recordistas);
  });

  app.post("/post", async (req, res) => {
    // recebe a requisição de post do front-end

    let referer = req.get("referer"); //recebe a url que está fazendo a requisição de post

    console.log("post:" + referer);

    if (referer !== "https://ramonmelo.com.br/") {
      res.status(403).send("Não autorizado!");
      console.log("Não autorizado!");
      return;
    }
    const { nome, pontuacao } = req.body;

    let nomeSanitizado = nome.replace(/[^a-zA-Z0-9\sçáéíâêãõ]/g, ""); // sanitização da variável nome para que caracteres especiais não sejam lidos

    const dadosRecordista = { nomeSanitizado, pontuacao };
    console.log("index.js " + dadosRecordista.nome);
    console.log("inserindo novo recordista ...");
    await db.registro(dadosRecordista);

    res
      .status(200)
      .send(`Recordista ${dadosRecordista.nomeSanitizado} inserido!`);
  });

  app.listen(porta, console.log("API disponível"));
})();
