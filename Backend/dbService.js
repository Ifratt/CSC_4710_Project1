const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web_app",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

   // Registers a new user, only setting `registerday` (without `signintime`)
async registerUser(username, password, firstname, lastname, salary, age) {
   try {
       const query = "INSERT INTO users (username, password, firstname, lastname, salary, age, registerday) VALUES (?, ?, ?, ?, ?, ?, CURDATE());";
       const response = await new Promise((resolve, reject) => {
           connection.query(query, [username, password, firstname, lastname, salary, age], (err, result) => {
               if (err) reject(new Error(err.message));
               else resolve(result.insertId);
           });
       });
       return { id: response, username, firstname, lastname, salary, age };
   } catch (error) {
       console.log(error);
   }
}

// Logs in the user, verifies credentials, and updates `signintime` if successful
async loginUser(username, password) {
   try {
       // Check if username and password match
       const query = "SELECT * FROM users WHERE username = ? AND password = ?";
       const result = await new Promise((resolve, reject) => {
           connection.query(query, [username, password], (err, rows) => {
               if (err) reject(new Error(err.message));
               else if (rows.length > 0) resolve(true);  // User found
               else resolve(false);  // User not found
           });
       });

       if (result) {
           // If user exists, update the `signintime`
           const updateQuery = "UPDATE users SET signintime = NOW() WHERE username = ?";
           await new Promise((resolve, reject) => {
               connection.query(updateQuery, [username], (err) => {
                   if (err) reject(new Error(err.message));
                   else resolve();
               });
           });
       }

       return result; // Return true if login successful, false otherwise
   } catch (error) {
       console.log(error);
       return false;
   }
}
}

module.exports = DbService;
