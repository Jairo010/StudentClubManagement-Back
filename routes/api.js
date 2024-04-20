const express = require("express");
const router = express.Router();

router.use('/users',require('./apis/users'))
router.use('/semester',require('./apis/semester'))

module.exports = router;
