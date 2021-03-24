const router = require('express').Router();
const userRoutes = require('./userRoute');
const commentRoutes = require('./commentRoute');
const blogpostRoutes = require('./blogpostRoute');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/blogpost', blogpostRoutes);


module.exports = router;