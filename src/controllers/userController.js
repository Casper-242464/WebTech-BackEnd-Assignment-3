const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render('users', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error while fetching users'); // 500 Internal Server Error
  }
};

module.exports = {
  getUsers
};
