const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAUser,
  deleteAUser,
  registerAUser,
  updateAUser,
  loginAUser,
} = require("../controllers/userController");

router.get("/", getAllUsers); //Access all users
router.get("/:id", getAUser); //Access specific user
router.delete("/:id", deleteAUser); //delete user
router.post("/", registerAUser); //add a user
router.post("/login", loginAUser); //login user
router.put("/:id", updateAUser); //update user

module.exports = router;
