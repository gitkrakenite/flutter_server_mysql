const connectDB = require("../config/db"); //import the connection

//get all users from DB
const getAllUsers = async (req, res, next) => {
  try {
    const [users] = await connectDB.query("SELECT * FROM users");

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get specific user from DB
const getAUser = async (req, res) => {
  try {
    const [user] = await connectDB.query(
      "SELECT * FROM users WHERE user_id = ?",
      [req.params.id]
    );
    if (user.length == 0) {
      res.status(500).send("User Not Found");
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete user from DB
const deleteAUser = async (req, res) => {
  try {
    const [user] = await connectDB.query(
      "DELETE FROM users WHERE user_id = ?",
      [req.params.id]
    );
    if (user.affectedRows == 0) {
      res.status(500).send("User Not Found");
      return;
    }
    res.status(200).send("deleted succesfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//This update method requires that all values are sent from body to database
// const updateAUser = async (req, res) => {
//   try {
//      // Extract user_id from request parameters
//      const { id } = req.params;
//      // Extract new user details from request body
//      const { username, phone, user_pwd } = req.body;

//      // Update the user in the database
//      const [user] = await connectDB.query(
//        "UPDATE users SET username = ?, phone = ?, user_pwd = ? WHERE id = ?",
//        [username, phone, user_pwd, id]
//      );

//      // Send a success response
//      res.status(200).send(user);
//   } catch (error) {
//      // Send an error response
//      res.status(500).send(error.message);
//   }
//  };

// update user from DB. This ensures you only update the values changed
// and leaves the rest as they were
const updateAUser = async (req, res) => {
  try {
    // Extract user_id from request parameters
    const { id } = req.params;
    // Extract new user details from request body
    const { username, phone, user_pwd } = req.body;

    // Prepare the SQL query and parameters
    let query = "UPDATE users SET ";
    let params = [];
    let counter = 0;

    if (username) {
      query += `username = ?`;
      params.push(username);
      counter++;
    }
    if (phone) {
      query += counter > 0 ? ", " : "";
      query += `phone = ?`;
      params.push(phone);
      counter++;
    }
    if (user_pwd) {
      query += counter > 0 ? ", " : "";
      query += `user_pwd = ?`;
      params.push(user_pwd);
      counter++;
    }

    query += ` WHERE user_id = ?`;
    params.push(id);

    // Execute the update query
    const [user] = await connectDB.query(query, params);

    // Send a success response
    res.status(200).send(user);
  } catch (error) {
    // Send an error response
    res.status(500).send(error.message);
  }
};

// create userfrom DB
const registerAUser = async (req, res) => {
  const { username, phone, user_pwd } = req.body;

  if (!username || !phone || !user_pwd) {
    res.status(404).send("Details missing");
    return;
  }

  try {
    const [user] = await connectDB.query(
      "INSERT INTO users (username, phone, user_pwd) VALUES ( ?, ?, ?)",
      [username, phone, user_pwd]
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginAUser = async (req, res) => {
  const { username, user_pwd } = req.body;

  if (!username || !user_pwd) {
    res.status(404).send("Username and password are required");
    return;
  }

  try {
    // Query the database to find a user with the provided username and password
    const [user] = await connectDB.query(
      "SELECT * FROM users WHERE username = ? AND user_pwd = ?",
      [username, user_pwd]
    );

    // Check if a user was found
    if (user.length > 0) {
      // User is authenticated, you can set up a session or send a success response
      // For simplicity, we'll just send a success response
      res.status(200).send("Login successful");
    } else {
      // No user found, send an error response
      res.status(401).send("Incorrect username or password");
    }
  } catch (error) {
    // Handle any errors that occur during the query
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getAUser,
  deleteAUser,
  registerAUser,
  updateAUser,
  loginAUser,
};
