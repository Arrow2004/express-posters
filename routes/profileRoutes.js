const { Router } = require("express");
const router = Router();
const {getProfilePage} = require('../controllers/profileController')
router.get('/:email',getProfilePage)
module.exports = router;