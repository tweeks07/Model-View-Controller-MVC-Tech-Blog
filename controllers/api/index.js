const router = require('express').Router();
const userRoute = require('./userRoute');
const commentRoute = require('./commentRoute');
const blogRoute = require('./blogRoute');

router.use('/users', userRoute);
router.use('/comment', commentRoute);
router.use('/blog', blogRoute);


module.exports = router;