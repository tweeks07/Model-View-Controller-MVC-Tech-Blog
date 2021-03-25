const router = require('express').Router();
const { User, Comment, Blog  } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all Blogpost and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

        // Serialize data so the template can read it
        const blog = blogData.map((blogpost) => Blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', { 
          blog, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });


    router.get('/blog/:id', withAuth, async (req, res) => {
        try {
          const blogData = await Blog.findByPk(req.params.id, {
            include: [
              {
                model: User,
                attributes: ['name'],
              },
              {
                  model: Comment,
              }
            ],
          });
      
          const blog = blogData.get({ plain: true });
      
          res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
          });
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      // Use withAuth middleware to prevent access to route
      router.get('/profile', withAuth, async (req, res) => {
        try {
          // Find the logged in user based on the session ID
          const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
          });
      
          const user = userData.get({ plain: true });
      
          res.render('profile', {
            ...user,
            logged_in: true
          });
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      router.get('/login', (req, res) => {
        // If the user is already logged in, redirect the request to another route
        if (req.session.logged_in) {
          res.redirect('/profile');
          return;
        }
      
        res.render('login');
      });
      
      module.exports = router;
      