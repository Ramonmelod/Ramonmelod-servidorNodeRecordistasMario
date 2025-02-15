const { exec } = require("node:child_process");

console.log("\n \n🔴 aguardando postgres aceitar conexões \n");
async function checkPostgres() {
  exec("docker exec postgres-dev pg_isready", handleReturn);

  async function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

checkPostgres();
