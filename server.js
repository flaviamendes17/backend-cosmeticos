require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cosmeticosRoutes = require ("./src/routes/cosmeticosRoutes");
const marcasRoutes = require ("./src/routes/marcasRoutes");
const reportRoutes = require ("./src/routes/reportRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", cosmeticosRoutes);
app.use("/api", marcasRoutes);
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`💻 Servidor rodando em http://localhost:${PORT}`)
});