const { Router } = require("express");
const router = Router();
const {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout
} = require("../controllers/authController");
const {guest} = require('../midllwares/auth.mid')
router.get("/login", guest,getLoginPage);
router.get("/signup", guest,getRegisterPage);
router.post("/signup", guest,registerNewUser);
router.post("/login", guest,loginUser);
router.get('/logout',guest,logout)
module.exports = router;
