const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const router = require("express").Router();
var pg = require("pg");

//middleware

app.use(cors());

app.use(express.json());

//

var conString =
  "postgres://janpmiwo:UDp-DIyOC5Yrd7ejQWKsACQr3XrdH6Z7@bubble.db.elephantsql.com/janpmiwo"; //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/admin-login", (req, res) => {
  res.send("Harsha");
});

app.post("/api/admin-login", async (req, res) => {
  try {
    //console.log("req", req);
    const { email, password } = await req.body;

    console.log("admin-email", email);
    console.log("admin-password", password);

    // Fetch admin data from the database based on email
    const adminData = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);

    if (adminData.rows.length === 0) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const hashedPassword = adminData.rows[0].password_hash;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      return res.json({ message: "Admin login successful" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
