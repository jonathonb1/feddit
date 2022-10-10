const router = require('express').Router();

const apiRoutes = require('./api/');
const homePage = require('./home-page.js');
const blogPage = require('./blog-page.js');
const loginPage = require('./accountinput-page.js');
const accLandingPage = require('./accountlanding-page.js')

router.use('/', homePage);
router.use('/dashboard', blogPage);
router.use('/api', apiRoutes);
router.use('/', loginPage);
router.use('/', accLandingPage);

module.exports = router;
