(async()=>{
    const db = require('./db.js')
    console.log('obtendo recordistas')
    const recordistas = await db.consulta()
   
    const cors = require('cors')      // pacote cors: utilzado para permissão de requisições cruzadas



   const express = require('express')
   const app = express()
   const porta  = process.env.PORT   ||8080
   
   app.use(cors())

   app.get('/',(req, res)=>{
   
       res.send(recordistas)    
       
   })

   app.listen(porta,console.log('API disponível'))

})()


