const express = require("express");
const router = express.Router();
const {
  getAllBusinesses,
  getABusiness,
  deleteABusiness,
  createBiz,
  updateABiz,
  getMyBusinesses,
} = require("../controllers/bizController");

router.get("/", getAllBusinesses); //Access all businesss
router.post("/mine", getMyBusinesses); //Access my businesss
router.get("/:id", getABusiness); //Access specific business
router.delete("/:id", deleteABusiness); //delete business
router.post("/", createBiz); //add a business
router.put("/:id", updateABiz); //update business

module.exports = router;
