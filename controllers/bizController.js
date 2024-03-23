const connectDB = require("../config/db"); //import the connection

//get all biz from DB
const getAllBusinesses = async (req, res, next) => {
  try {
    const [biz] = await connectDB.query("SELECT * FROM businesses");
    res.status(200).send(biz);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get specific business from DB
const getABusiness = async (req, res) => {
  try {
    const [biz] = await connectDB.query(
      "SELECT * FROM businesses WHERE business_id = ?",
      [req.params.id]
    );
    if (biz.length == 0) {
      res.status(500).send("Business Not Found");
      return;
    }
    res.status(200).send(biz);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete business from DB
const deleteABusiness = async (req, res) => {
  try {
    const [biz] = await connectDB.query(
      "DELETE FROM businesses WHERE business_id = ?",
      [req.params.id]
    );
    if (biz.affectedRows == 0) {
      res.status(500).send("biz Not Found");
      return;
    }
    res.status(200).send("deleted succesfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//This update method requires that all values are sent from body to database
const updateABiz = async (req, res) => {
  try {
    // Extract biz_id from request parameters
    const { id } = req.params;
    // Extract new biz details from request body
    const {
      title,
      business_desc,
      photo,
      category,
      business_location,
      phone,
      business_owner,
    } = req.body;

    // Update the biz in the database
    const [biz] = await connectDB.query(
      "UPDATE businesses SET title = ?, business_desc = ?, photo = ?, category = ?, business_location = ?, phone = ?, business_owner = ? WHERE business_id = ?",
      [
        title,
        business_desc,
        photo,
        category,
        business_location,
        phone,
        business_owner,
        id,
      ]
    );

    // Send a success response
    res.status(200).send(biz);
  } catch (error) {
    // Send an error response
    res.status(500).send(error.message);
  }
};

// create userfrom DB
const createBiz = async (req, res) => {
  //get data from user
  const {
    title,
    business_desc,
    photo,
    category,
    business_location,
    phone,
    business_owner,
  } = req.body;

  //ensure all data is sent
  if (
    !title ||
    !business_desc ||
    !photo ||
    !photo ||
    !category ||
    !business_location ||
    !phone ||
    !business_owner
  ) {
    res.status(404).send("Details missing");
    return;
  }

  try {
    const [biz] = await connectDB.query(
      "INSERT INTO businesses (title, business_desc, photo, category, business_location, phone, business_owner) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        business_desc,
        photo,
        category,
        business_location,
        phone,
        business_owner,
      ]
    );
    res.status(200).send(biz);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createBiz,
  getAllBusinesses,
  getABusiness,
  updateABiz,
  deleteABusiness,
};
