const express = require('express');
const router = express.Router();
const homeFunctions = require('../controllers/route.js');

router.get('/', homeFunctions.getHomepage)

router.post('/read', homeFunctions.postHomepage)

// connection.end();

module.exports = router;