test("teste get das linhas do banco de dados", async () => {
  const response = await fetch("http://localhost:8080");
  expect(response.status).toBe(200);
});
