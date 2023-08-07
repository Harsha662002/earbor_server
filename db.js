const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "harsha123",
  host: "https://earbor-server.vercel.app",
  port: 5432,
  database: "earbor",
});

module.exports = pool;
