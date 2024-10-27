// database services, accessbile by DbService methods.

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;


// if you use .env to configure
/*
console.log("HOST: " + process.env.HOST);
console.log("DB USER: " + process.env.DB_USER);
console.log("PASSWORD: " + process.env.PASSWORD);
console.log("DATABASE: " + process.env.DATABASE);
console.log("DB PORT: " + process.env.DB_PORT);

const connection = mysql.createConnection({
     host: process.env.HOST,
     user: process.env.USER,        
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
});
*/

// if you configure directly in this file, there is a security issue, but it will work
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
    console.log('db ' + connection.state);   // to see if the DB is connected or not
});

// the following are database functions,

class DbService {
    static getDbServiceInstance() {  // only one instance is sufficient
        return instance ? instance : new DbService();
    }

    async registerUser(username, password, firstname, lastname, salary, age) {
        try {
            const query = "INSERT INTO users (username, password, firstname, lastname, salary, age, registerday, signintime ) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), NOW());";
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
}

module.exports = DbService;
