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

const dbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("aberta conexão com o banco");
    return client;
  } catch (error) {
    console.log(error);
  }
};

const registro = async (novoRecordista) => {
  const sqlCode = {
    text: "insert into listarecordistas (s_nome_listarecordistas,i_pontuacao_listarecordistas) values($1,$2)",
    values: [novoRecordista.nomeSanitizado, novoRecordista.pontuacao],
  };
  console.log("método registro de recordista acessado");

  let client = await dbConnection();
  try {
    console.log(novoRecordista.nomeSanitizado);
    const res = await client.query(sqlCode);
    console.log("recordista inserido");
    return;
  } catch (error) {
    console.log(error);
  } finally {
    if (dbConnection) {
      client.release();
    }
  }
};

const consulta = async () => {
  console.log("método consulta de recordista acessada");

  let client = await dbConnection();
  try {
    console.log("entrou no try do consulta de recordista");

    const result = await client.query(
      "SELECT * FROM listarecordistas ORDER BY i_pontuacao_listarecordistas DESC limit 10",
    );
    const linhas = [];

    for (let i = 0; i < result.rows.length; i++) {
      linhas.push(result.rows[i]);
    }
    return linhas;
  } catch (error) {
    console.log(error);
  } finally {
    if (client) {
      client.release();
    }
  }
};
module.exports = { consulta, registro };
