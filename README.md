# servidorNodeRecordistasMario

<div>
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="logo express" width="200" height="auto">
<img src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="logo Postgresql" width="200" height="auto">
</div>
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="logo node" width="300" height="auto">

## tecnologias utilizadas:

- `Express`
- `MySql`
- `Node`

## Descrição:

- Esta ApiRest em node-express consulta e posta em um banco de dados MySql com o objetivo de consultar e resgistrar os recordistas do jogo do mário implementado em [jogoMario](https://github.com/Ramonmelod/supermario/tree/main)

## Autor

- Ramon Melo — Linkedin: [/in/ramonmelod](https://www.linkedin.com/in/ramonmelod/)

## Endpoints

### POST

`/post`

```json
{
  "i_idrecordista_listarecordistas": 50,
  "s_nome_listarecordistas": "Fulano",
  "i_pontuacao_listarecordistas": 25
}
```

- Exemplo de requisição utilizando HTTPie: ##post
  http POST http://localhost:8080/post Content-Type:application/json <<< '{"i_idrecordista_listarecordistas": 19,"s_nome_listarecordistas" : "Carlos","i_pontuacao_listarecordistas": 25}'

## GET

**Requisição**

`/`
