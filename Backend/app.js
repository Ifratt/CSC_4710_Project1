// Backend: application services, accessible by URIs
const DbService = require('./dbService');


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post('/register', (request, response) => {
    const { username, password, firstname, lastname, salary, age } = request.body;

    const db = DbService.getDbServiceInstance();
    const result = db.registerUser(username, password, firstname, lastname, salary, age);

    result
        .then(data => response.json({ success: true, data }))
        .catch(err => response.status(500).json({ success: false, error: err.message }));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = DbService.getDbServiceInstance();

    const loginSuccess = await db.loginUser(username, password);

    if (loginSuccess) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});



// read 
app.get('/getAll', (request, response) => {
    
    const db = DbService.getDbServiceInstance();

    
    const result =  db.getAllData(); // call a DB function

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});




app.get('/search/salary', async (req, res) => {
    const min =  Number(req.query.min);
    const max =  Number(req.query.max);

    // Ensure that min and max are numbers
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return res.status(400).send({ error: "Invalid parameters." });
    }

    const db = DbService.getDbServiceInstance(); 

    try {
        const results = await db.getUsersBySalary(min, max);
        res.send({ data: results });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

app.get('/search/age', async (req, res) => {
    const min = Number(req.query.min);
    const max =  Number(req.query.max);

    // Ensure that min and max are numbers
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return res.status(400).send({ error: "Invalid parameters." });
    }

    const db = DbService.getDbServiceInstance(); 

    try {
        const results = await db.getUsersByAge(min, max);
        res.send({ data: results });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});








//hiba 
app.get('/search/joinedAfterJohn', (request, response) => {
    const db = DbService.getDbServiceInstance();
    db.getJoinedAfterJohn()
        .then(data => response.json({ data }))
        .catch(err => console.log(err));
});

app.get('/search/neverSignedIn', (request, response) => {
    const db = DbService.getDbServiceInstance();
    db.getUsersNeverSignedIn()
        .then(data => response.json({ data }))
        .catch(err => console.log(err));
});

app.get('/search/registeredOnSameDayAsJohn', (request, response) => {
    const db = DbService.getDbServiceInstance();
    db.getUsersRegisteredOnSameDayAsJohn()
        .then(data => response.json({ data }))
        .catch(err => console.log(err));
});
app.get('/search/registeredToday', (request, response) => {
    const db = DbService.getDbServiceInstance();
    db.getUsersRegisteredToday()
        .then(data => response.json({ data }))
        .catch(err => console.log(err));
});











//seach by userid, last/first name
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    console.log("Searching for:", name);

    const db = DbService.getDbServiceInstance();

    // Query the database for username, first name, or last name
    const result = db.searchByName(name);

    result
        .then(data => {
            console.log("Search result:", data); // Log the search results
            response.json({ data: data });
        })
        .catch(err => console.log(err));
});













// debug function, will be deleted later
app.post('/debug', (request, response) => {
    // console.log(request.body); 

    const {debug} = request.body;
    console.log(debug);

    return response.json({success: true});
});   

// set up the web server listener
// if we use .env to configure
/*
app.listen(process.env.PORT, 
    () => {
        console.log("I am listening on the configured port " + process.env.PORT)
    }
);
*/

// if we configure here directly
app.listen(5050, 
    () => {
        console.log("I am listening on the fixed port 5050.")
    }
);