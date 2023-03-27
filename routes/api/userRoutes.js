const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// User routes
router.route('/').get(getAllUsers).post(createUser);

// User by ID routes
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Friend routes
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;