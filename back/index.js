const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "Aasim",
  password: "Aasim26sk",
  database: "sample_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, name, email, age });
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sql = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});
