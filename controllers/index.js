const router = require('express').Router();

const apiRoutes = require('./api/');
const homePage = require('./home-page.js');
const blogPage = require('./blog-page.js');

router.use('/', homePage);
router.use('/dashboard', blogPage);
router.use('/api', apiRoutes);

module.exports = router;
