// routes/artifactRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controller/ArtifactController");

// create with upload
router.post("/create", ctrl.uploadMiddleware, ctrl.createArtifact);

// read
router.get("/getall", ctrl.getAll);
router.get("/get/:id", ctrl.getOne);

// update (optional files)
router.put("/update/:id", ctrl.uploadMiddleware, ctrl.updateArtifact);

// delete
router.delete("/delete/:id", ctrl.deleteArtifact);

module.exports = router;
