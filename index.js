import express from "express";
// import mysql from "mysql2";
import mysql from "mysql2";
import cors from "cors"
import {PORT} from "./config.js"
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
} from "./config.js"

const app = express();

const db = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend YEAH");
});

app.get("/bloques", (req, res) => {
  const q = "SELECT * FROM bloqueherramientas";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/bloques", (req, res) => {
  const q =
    "INSERT INTO bloqueherramientas (`nombre`, `descripcion`, `hashtag`, `link`) VALUES (?)";

  const values = [
    req.body.nombre,
    req.body.descripcion,
    req.body.hashtag,
    req.body.link,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Bloque ha sido creado correctamente");
  });
});

app.delete("/bloques/:id", (req, res) => {
  const bloqueId = req.params.id 
  const q = "DELETE FROM bloqueherramientas WHERE id = ?"

  db.query(q, [bloqueId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Bloque ha sido eliminado correctamente");
  })
})

app.put("/bloques/:id", (req, res) => {
  const bloqueId = req.params.id 
  const q = "UPDATE bloqueherramientas SET `nombre` = ?, `descripcion` = ?, `hashtag` = ?, `link` = ? WHERE id = ?"

  const values = [
    req.body.nombre,
    req.body.descripcion,
    req.body.hashtag,
    req.body.link,
  ];

  db.query(q, [...values, bloqueId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Bloque se ha actualizado correctamente");
  })
})

app.listen(PORT, () => {
  console.log("Connected to backend!");
});
