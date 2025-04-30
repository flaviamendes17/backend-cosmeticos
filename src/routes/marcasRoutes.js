const express = require("express");
const router = express.Router();
const marcasController = require("../controllers/marcasController");

router.get("/marcas", marcasController.getAllMarcas);
router.get("/marcas/:id", marcasController.getMarcas);
router.post("/marcas", marcasController.createMarcas);
router.delete("/marcas/:id", marcasController.deleteMarcas);
router.put("/marcas/:id", marcasController.updateMarcas);

module.exports = router;
