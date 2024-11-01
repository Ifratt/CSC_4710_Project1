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
        const query = "INSERT INTO Users (username, password, firstname, lastname, salary, age, registerday) VALUES (?, ?, ?, ?, ?, ?, CURDATE());";
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


    async getAllData(){
        try{
           // use await to call an asynchronous function
           const response = await new Promise((resolve, reject) => 
              {
                  const query = "SELECT * FROM Users;";
                  connection.query(query, 
                       (err, results) => {
                             if(err) reject(new Error(err.message));
                             else resolve(results);
                       }
                  );
               }
            );
        
            // console.log("dbServices.js: search result:");
            // console.log(response);  // for debugging to see the result of select
            return response;

        }  catch(error){
           console.log(error);
        }
   }




// Logs in the user, verifies credentials, and updates `signintime` if successful
async loginUser(username, password) {
   try {
       // Check if username and password match
       const query = "SELECT * FROM Users WHERE username = ? AND password = ?";
       const result = await new Promise((resolve, reject) => {
           connection.query(query, [username, password], (err, rows) => {
               if (err) reject(new Error(err.message));
               else if (rows.length > 0) resolve(true);  // User found
               else resolve(false);  // User not found
           });
       });

       if (result) {
           // If user exists, update the `signintime`
           const updateQuery = "UPDATE Users SET signintime = NOW() WHERE username = ?";
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



async getUsersBySalary(min, max) {
    const query = 'SELECT * FROM Users WHERE salary BETWEEN ? AND ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [min, max], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

async getUsersByAge(min, max) {
    const query = 'SELECT * FROM Users WHERE age BETWEEN ? AND ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [min, max], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}







//hiba
async getJoinedAfterJohn() {
    try {
        const query = `
            SELECT * FROM users WHERE signintime > (
                SELECT signintime FROM users WHERE username = 'john'
            );
        `;
        const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async getUsersNeverSignedIn() {
    try {
        const query = "SELECT * FROM users WHERE signintime IS NULL;";
        const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async getUsersRegisteredOnSameDayAsJohn() {
    try {
        const query = `
            SELECT * FROM users WHERE registerday = (
                SELECT registerday FROM users WHERE username = 'john'
            );
        `;
        const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async getUsersRegisteredToday() {
    try {
        const query = "SELECT * FROM users WHERE registerday = CURDATE();";
        const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}
//seach by userid, last/first name
async searchByName(name) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM Users 
                WHERE username = ? OR firstname = ? OR lastname = ?;
            `;
            connection.query(query, [name, name, name], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}




}


module.exports = DbService;
