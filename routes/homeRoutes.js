const {Router} = require('express');
const router = Router();
const {getHomepage} = require('../controllers/homeController')

router.get('/',getHomepage);

module.exports = router;