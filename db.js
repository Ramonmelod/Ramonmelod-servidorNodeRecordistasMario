

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
  
  const [linhas] = await con.query('SELECT * FROM listarecordistas ORDER BY i_pontuacao_listarecordistas DESC') // faz a leitura e ordena a lista de recordista
  return linhas

}

const registro = async(novoRecordista)=>{
  const con = await conectar()
  const sqlCode = 'insert into listarecordistas (s_nome_listarecordistas,i_pontuacao_listarecordistas) values (?,?)'
  const valores = [novoRecordista.nome,novoRecordista.pontuacao]
  await con.query(sqlCode,valores)
  console.log('novo recordista inserido')

}
module.exports = {consulta,registro}

