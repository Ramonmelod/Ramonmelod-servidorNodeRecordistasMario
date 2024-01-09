(async()=>{
    const db = require('./db.js')                  // inclusão arquivo db.js
    const cors = require('cors')                  // pacote cors: utilzado para permissão de requisições cruzadas
    const bodyParser = require('body-parser')    // incluído para analise das requisições de post
    
   
   
   const express = require('express')
   const app = express()
   const porta  = process.env.PORT   ||8080
   
   app.use(cors())                                //uso do cors
   app.use(bodyParser.json())                    // uso do body-Parser json


   app.get('/',async(req, res)=>{                    // rota para requisição da lista de recordistas

       const recordistas = await db.consulta()
       console.log('obtendo recordistas')
       res.send(recordistas)    
       
   })

   app.post('/post',async(req,res)=>{          // recebe a requisição de post do front-end
    
    let host = req.get('referer')  //recebe a url que está fazendo a requisição de post
    

    console.log("post:" + host)

    if(host ==="https://ramonmelo.com.br/"){                   // condição para que a operação de post seja realizada

        
    const {nome, pontuacao} = req.body

    let nomeSanitizado = nome.replace(/[^a-zA-Z0-9\sçáéíâêãõ]/g,'') // sanitização da variável nome para que caracteres especiais não sejam lidos
    
    const dadosRecordista = {nomeSanitizado, pontuacao }
    console.log('inserindo novo recordista ...')
    await db.registro(dadosRecordista)
    
    res.status(200).send('novo recordista inserido!')

    }else{
        res.status(403).send("Não autorizado!")
        console.log("Não autorizado!")
    }

     
   })

   app.listen(porta,console.log('API disponível'))
   
})()


