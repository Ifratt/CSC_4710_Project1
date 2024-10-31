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
