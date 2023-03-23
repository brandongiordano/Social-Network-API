const { Users } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
      Users.find({})
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // get one user by id
    getUserById({ params }, res) {
      Users.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user with that ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    createUser({ body }, res) {
      Users.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
    // update one user by id
    updateUser({ params, body }, res) {
      Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user with that ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // delete user
    deleteUser({ params }, res) {
      Users.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "no user with that ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
  
    // add friend
    addFriend({ params }, res) {
      Users.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId } },
        { new: true }
      )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
  
    removeFriend({ params }, res) {
      Users.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "no user with that ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
  };
  
  module.exports = userController;