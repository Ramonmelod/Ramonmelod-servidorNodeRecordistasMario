const { Pool } = require("pg");
require("dotenv").config(); // habilita a leitura de arquivos .env

const pool = new Pool({
  host: process.env.PGHOST,
  port: 5432,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false },
  family: 4,
  //max: 80,
});

const registro = async (novoRecordista) => {
  const sqlCode = {
    text: "insert into listarecordistas (s_nome_listarecordistas,i_pontuacao_listarecordistas) values($1,$2)",
    values: [novoRecordista.nomeSanitizado, novoRecordista.pontuacao],
  };
  console.log("registro de recordista acessado");
  const client = await pool.connect();
  console.log("aberta conexão com o banco");
  try {
    console.log(novoRecordista.nomeSanitizado);
    const res = await client.query(sqlCode); //client.query
    console.log("recordista inserido");
    return;
  } catch (error) {
    console.log("Erro no try-catch em: " + error);
  } finally {
    if (client) {
      client.release();
    }
  }
};

const consulta = async () => {
  console.log("consulta acessada");
  const client = await pool.connect(); // verificar se let é válido
  console.log("aberta conexão com o banco");

  try {
    const result = await client.query(
      "SELECT * FROM listarecordistas ORDER BY i_pontuacao_listarecordistas DESC limit 10",
    ); //client.query
    const linhas = [];

    for (let i = 0; i < result.rows.length; i++) {
      linhas.push(result.rows[i]);
    }
    return linhas;
  } catch (error) {
    console.log("Erro no try-catch em: " + error);
  } finally {
    if (client) {
      client.release();
    }
  }
};
module.exports = { consulta, registro };
