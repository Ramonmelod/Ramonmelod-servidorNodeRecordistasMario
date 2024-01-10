test("teste de post das linhas do banco de dados",async()=>{
const body = {nome:'Jest',                                      // elemento a ser enviado para o banco de dados 
              pontuacao: 42 }

const response = await fetch('http://localhost:8080/post', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json',
                'referer':'http://127.0.0.1:5500/'}             //para que este teste funcione o referer deve ser igual ao referer do index.js
})

console.log('teste de post: ' + await response.text())
   expect(response.status).toBe(200)                            // espera-se o código 200 que representa o sucesso do post
})

//----------------- Teste de bloqueio--------------------------------

test("teste bloqueio post das linhas do banco de dados",async()=>{

    const body = {nome:'Jest',                                       // elemento a ser enviado para o banco de dados 
                  pontuacao: 42 }
    
    const response = await fetch('http://localhost:8080/post', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json',
                    'referer':'https://curl.se'}                        // o referer é determinado para que este teste seja sempre bloqueado
    })
    
    console.log('teste de bloqueio por referer: '+ await response.text())
       expect(response.status).toBe(403)                                //espera-se o código 403 que representa que o post não foi autorizado
    })
    
