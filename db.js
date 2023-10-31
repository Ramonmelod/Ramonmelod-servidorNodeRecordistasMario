

const conectar = async()=>{
  if(global.conexao && global.conexao.state !='disconected')
  { return global.conexao }
  require('dotenv').config()
  const mysql = require('mysql2/promise')
  const con = await mysql.createConnection(process.env.DATABASE_URL)
  console.log('conectado com o banco de dados')
  global.conexao = con
  return con

}

const consulta = async()=>{
  const con = await conectar()
  const [linhas] = await con.query('SELECT * FROM listarecordistas')
  return linhas

}

module.exports = {consulta}

