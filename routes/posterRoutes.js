const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  deletePoster,
} = require("../controllers/posterControllers");
const {protected} = require('../midllwares/auth.mid')
const upload = require('../utils/fileUpload')
router.get("/", getPostersPage);
router.get("/add", protected, addNewPosterPage);
router.post("/add",protected,upload.single('image'), addNewPoster);
router.get("/:id", getOnePoster);
router.get("/:id/edit",protected, getEditPosterPage);
router.post("/:id/edit",protected, updatePoster);
router.post("/:id/delete",protected, deletePoster);
module.exports = router;
