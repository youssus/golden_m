// controllers/artifactController.js
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Artifact = require("../entities/Artifact");

// simple disk storage into /uploads
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// filename: timestamp-original
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safe}`);
  },
});

// accept only images (very simple check)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only images allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// export middleware and handlers
exports.uploadMiddleware = upload.fields([
  { name: "banner", maxCount: 1 },
  { name: "pictures", maxCount: 4 },
]);

// CREATE
exports.createArtifact = async (req, res) => {
  try {
    const body = req.body || {};
    // attach files paths (if any)
    if (req.files?.banner?.[0]) {
      body.banner = path.join(
        "uploads",
        path.basename(req.files.banner[0].path)
      );
    }
    if (req.files?.pictures?.length) {
      body.pictures = req.files.pictures.map((f) =>
        path.join("uploads", path.basename(f.path))
      );
    }

    const art = new Artifact(body);
    await art.save();
    res.status(201).json(art);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
exports.getAll = async (req, res) => {
  try {
    const items = await Artifact.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getOne = async (req, res) => {
  try {
    const art = await Artifact.findById(req.params.id);
    if (!art) return res.status(404).json({ message: "Not found" });
    res.json(art);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (simple: accepts multipart - replaces banner/pictures if new provided)
exports.updateArtifact = async (req, res) => {
  try {
    const art = await Artifact.findById(req.params.id);
    if (!art) return res.status(404).json({ message: "Not found" });

    // update text fields
    Object.assign(art, req.body);

    // if new banner uploaded, replace path
    if (req.files?.banner?.[0]) {
      art.banner = path.join(
        "uploads",
        path.basename(req.files.banner[0].path)
      );
    }
    // if new pictures uploaded, replace array
    if (req.files?.pictures?.length) {
      art.pictures = req.files.pictures.map((f) =>
        path.join("uploads", path.basename(f.path))
      );
    }

    await art.save();
    res.json(art);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE (simple: deletes DB record; does not delete files)
exports.deleteArtifact = async (req, res) => {
  try {
    const art = await Artifact.findByIdAndDelete(req.params.id);
    if (!art) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
