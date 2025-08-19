const express = require("express");
const router = express.Router();
const artifactController = require("../controller/ArtifactController");

// Create
router.post("/create", artifactController.createArtifact);

// Read
router.get("/getall", artifactController.getAllArtifacts);
router.get("/get/:id", artifactController.getArtifactById);

// Update
router.put("/update/:id", artifactController.updateArtifact);

// Delete
router.delete("/delete/:id", artifactController.deleteArtifact);

module.exports = router;
