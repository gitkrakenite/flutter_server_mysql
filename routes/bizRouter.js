const express = require("express");
const router = express.Router();
const {
  getAllBusinesses,
  getABusiness,
  deleteABusiness,
  createBiz,
  updateABiz,
} = require("../controllers/bizController");

router.get("/", getAllBusinesses); //Access all users
router.get("/:id", getABusiness); //Access specific user
router.delete("/:id", deleteABusiness); //delete user
router.post("/", createBiz); //add a user
router.put("/:id", updateABiz); //update user

module.exports = router;
