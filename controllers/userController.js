const connectDB = require("../config/db"); //import the connection
const bcrypt = require("bcryptjs");

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

//==============================================
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
  //get data from user
  const { username, phone, user_pwd, location, profile } = req.body;

  //ensure all data is sent
  if (!username || !phone || !user_pwd || !location || !profile) {
    res.status(404).send("Details missing");
    return;
  }

  //ensure no such user exists in the db
  const [user] = await connectDB.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  //if no such user exists result is zero
  if (user.length == 0) {
    try {
      //hash the password for security
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user_pwd, salt);

      const [user] = await connectDB.query(
        "INSERT INTO users (username, phone, user_pwd, location, profile) VALUES ( ?, ?, ?, ?, ?)",
        [username, phone, hashedPassword, location, profile]
      );
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(400).send("User already exists");
  }
};

const loginAUser = async (req, res) => {
  //get data from client
  const { username, user_pwd } = req.body;

  // console.log(req.body);

  //ensure we have the data we need
  if (!username || !user_pwd) {
    res.status(404).send("Username and password are required");
    return;
  }

  //ensure this user exists in the db
  const [user] = await connectDB.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  //if no user exists
  if (user.length == 0) {
    res.status(400).send("no such username exists");
  } else {
    try {
      // try to decrypt the password
      let db_pwd = user[0].user_pwd;
      let match = await bcrypt.compare(user_pwd, db_pwd);

      if (match) {
        //send back the user to client
        const [user] = await connectDB.query(
          "SELECT * FROM users WHERE username = ?",
          [username]
        );
        res.status(200).send(user[0]);
      } else {
        // No user found, send an error response
        res.status(401).send("Incorrect username or password");
      }
    } catch (error) {
      // Handle any errors that occur during the query
      res.status(500).send(error.message);
    }
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
