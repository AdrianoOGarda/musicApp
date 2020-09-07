const express = require('express');
const router = express.Router();

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    private
} = require("../controllers/index")

const { MUSICIAN } = require("../roles")

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/profile', ensureLogin("/login"), checkRole(MUSICIAN), private)

module.exports = router;