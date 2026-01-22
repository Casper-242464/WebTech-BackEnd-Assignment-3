const userService = require('../services/userService');

const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const userProfile = await userService.getUserById(userId);

    if (!userProfile) {
      return res.status(404).render('profile', { error: 'Profile not found.' }); // 404 Not Found
    }

    // Render profile page with user data
    res.render('profile', { user: userProfile });

  } catch (err) {
    console.error(err);
    res.status(500).render('profile', { error: 'Server error while retrieving profile.' }); // 500 Internal Server Error
  }
};

module.exports = {
  getProfile
};
