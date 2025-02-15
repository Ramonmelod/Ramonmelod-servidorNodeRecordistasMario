# Mario Server

<div>
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="express logo" width="200" height="auto">
<img src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="postgresql logo" width="200" height="auto">

## Technologies used:

- `Express`
- `Postgres`
- `Node`

## Description:

- This Node-Express API queries and posts to a MySQL database with the purpose of querying and registering record holders for the Mario game implemented in [jogoMario](https://github.com/Ramonmelod/supermario/tree/main)

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

- Example of a request using Curl:

```sh
curl -X POST http://localhost:8080/post -H "Content-Type: application/json" -H "Referer: https://ramonmelo.com.br/" -d '{"nome": "Fulano", "pontuacao": 42}'
```

## GET

**Requisição**

`/`

```
curl -s http://localhost:8080/ | python3 -m json.tool

```

## Direct acces to the database container

- In ubuntu you can access the postgres database container using the comand:

```sh
  psql --host=localhost --username=postgres --port=5432

```

- After this command the database shell request the password, which is:`local_password`

## Author

- Ramon Melo — Linkedin: [/in/ramonmelod](https://www.linkedin.com/in/ramonmelod/)
