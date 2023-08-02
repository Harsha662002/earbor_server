const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "harsha123",
  host: "localhost",
  port: 5432,
  database: "earbor",
});

module.exports = pool;
