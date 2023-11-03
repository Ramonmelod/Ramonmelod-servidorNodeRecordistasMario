(async()=>{
    const db = require('./db.js')                  // inclusão arquivo db.js
    const cors = require('cors')                  // pacote cors: utilzado para permissão de requisições cruzadas
    const bodyParser = require('body-parser')    // incluído para analise das requisições de post
    
    const recordistas = await db.consulta()
    console.log('obtendo recordistas')
   
   const express = require('express')
   const app = express()
   const porta  = process.env.PORT   ||8080
   
   app.use(cors())                                //uso do cors
   app.use(bodyParser.json())                    // uso do body-Parser json


   app.get('/',(req, res)=>{                    // rota para requisição da lista de recordistas
   
       res.send(recordistas)    
       
   })

   app.post('/post',async(req,res)=>{          // recebe a requisição de post do front-end

    const {nome, pontuacao } = req.body
    const dadosRecordista = {nome, pontuacao }
    console.log('inserindo novo recordista ...')
    await db.registro(dadosRecordista)
    res.send('novo recordista inserido!')
    
    console.log('novo recordista inserido!')
    


   })

   app.listen(porta,console.log('API disponível'))
   
})()


