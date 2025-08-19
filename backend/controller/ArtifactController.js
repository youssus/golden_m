const Artifact = require("../entities/Artifact");

// Create new artifact
exports.createArtifact = async (req, res) => {
  try {
    const artifact = new Artifact(req.body);
    await artifact.save();
    res.status(201).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all artifacts
exports.getAllArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.status(200).json(artifacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get artifact by ID
exports.getArtifactById = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    res.status(200).json(artifact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update artifact
exports.updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    res.status(200).json(artifact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete artifact
exports.deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    res.status(200).json({ message: "Artifact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
