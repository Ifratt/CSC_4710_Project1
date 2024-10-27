
// This is the frontEnd that modifies the HTML page directly
// event-based programming,such as document load, click a button

/*
What is a Promise in Javascript? 

A Promise can be in one of three states:

    - Pending: The initial state; the promise is neither fulfilled nor rejected.

    - Fulfilled: The operation completed successfully, and the promise has a 
      resulting value.

    - Rejected: The operation failed, and the promise has a reason for the failure.

Promises have two main methods: then and catch.

    - The then method is used to handle the successful fulfillment of a promise. 
    It takes a callback function that will be called when the promise is resolved, 
    and it receives the resulting value.

    - The catch method is used to handle the rejection of a promise. It takes a 
    callback function that will be called when the promise is rejected, and it 
    receives the reason for the rejection.

What is a promise chain? 
    The Promise chain starts with some asyncOperation1(), which returns a promise, 
    and each subsequent ``then`` is used to handle the result of the previous Promise.

    The catch is used at the end to catch any errors that might occur at any point 
    in the chain.

    Each then returns a new Promise, allowing you to chain additional ``then`` calls to 
    handle subsequent results.

What is an arrow function?

    An arrow function in JavaScript is a concise way to write anonymous function 
    expressions.

    Traditional function syntax: 
        const add = function(x, y) {
           return x + y;
        };

    Arrow function syntax:
        const add = (x, y) => x + y;
    
    
Arrow functions have a few notable features:

    - Shorter Syntax: Arrow functions eliminate the need for the function keyword, 
      curly braces {}, and the return keyword in certain cases, making the syntax 
      more concise.

    - Implicit Return: If the arrow function consists of a single expression, it is 
      implicitly returned without needing the return keyword.

    - Lexical this: Arrow functions do not have their own this context; instead, they 
      inherit this from the surrounding code. This can be beneficial in certain situations,
      especially when dealing with callbacks and event handlers.
*/


// fetch call is to call the backend
// This is the frontEnd for user registration functionality
// event-based programming, utilizing DOM events

// fetch call to check initial state or for any setup
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5050/getAll')     
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});


const registerBtn = document.querySelector('#register-btn');
registerBtn.onclick = function() {
    const username = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;
    const firstname = document.querySelector('#firstname-input').value;
    const lastname = document.querySelector('#lastname-input').value;
    const salary = document.querySelector('#salary-input').value;
    const age = document.querySelector('#age-input').value;

    if (!username || !password || !firstname || !lastname || !salary || !age) {
        document.getElementById('message').innerText = "Error! Please fill in all fields.";
        return; 
    }

    fetch('http://localhost:5050/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, firstname, lastname, salary, age })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.success ? "Registration is successful" : "Registration has failed.";
        
        if (data.success) {
            document.querySelector('#username-input').value = '';
            document.querySelector('#password-input').value = '';
            document.querySelector('#firstname-input').value = '';
            document.querySelector('#lastname-input').value = '';
            document.querySelector('#salary-input').value = '';
            document.querySelector('#age-input').value = '';
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById('message').innerText = "An error occurred. Please try again.";
    });
}


// this function is used for debugging only, and should be deleted afterwards
function debug(data) {
    fetch('http://localhost:5050/debug', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ debug: data })
    });
}

