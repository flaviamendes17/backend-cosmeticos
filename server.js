require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cosmeticosRoutes = require //adicionar o caminho)

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", cosmeticosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`💻 Servidor rodando em http://localhost:${PORT}`)
});