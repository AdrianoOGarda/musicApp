const express = require('express');
const router = express.Router();

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    private
} = require("../controllers/index")

const { MUSICIAN, USER } = require("../roles")

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/profile', ensureLogin("/login"), checkRole(MUSICIAN), private)

router.get('/listener', ensureLogin("/login"), checkRole(USER), private)

module.exports = router;