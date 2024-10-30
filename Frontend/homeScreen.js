// This is the frontEnd that modifies the HTML page directly
// event-based programming, such as document load, click a button

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
    and each subsequent `then` is used to handle the result of the previous Promise.

    The catch is used at the end to catch any errors that might occur at any point 
    in the chain.

    Each then returns a new Promise, allowing you to chain additional `then` calls to 
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



document.addEventListener('DOMContentLoaded', function() {
    // one can point your browser to http://localhost:5050/getAll to check what it returns first.
    fetch('http://localhost:5050/getAll')     
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});


const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function () {
    const searchInput = document.querySelector('#search-input');
    const searchValue = searchInput.value.trim();
    searchInput.value = "";

    // Send a request to the backend with the search term
    fetch('http://localhost:5050/search/' + encodeURIComponent(searchValue))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.data.length === 0) {
                console.log("No data found for:", searchValue);
            } else {
                console.log("Data found:", data.data);
            }
            loadHTMLTable(data['data']);
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Error fetching data. Please try again."); // Notify the user of the error
        });
};







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

function insertRowIntoTable(data) {
    debug("homeScreen.js: insertRowIntoTable called: ");
    debug(data);

    const table = document.querySelector('table tbody');
    debug(table);

    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) { // iterating over the each property key of an object data
        if (data.hasOwnProperty(key)) { // key is a direct property for data
            if (key === 'registerday') { // the property is 'registerday'
                data[key] = new Date(data[key]).toLocaleDateString(); // format to javascript date string
            } else if (key === 'signintime') {
                data[key] = new Date(data[key]).toLocaleString(); // format to javascript date and time string
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.username}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.username}>Edit</button></td>`;
    tableHtml += "</tr>";

    if (isTableData) {
        debug("case 1");
        table.innerHTML = tableHtml;
    } else {
        debug("case 2");
        const newrow = table.insertRow();
        newrow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    debug("homeScreen.js: loadHTMLTable called.");

    const table = document.querySelector('table tbody'); 

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({ username, password, firstname, lastname, salary, age, registerday, signintime }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${username}</td>`;
        tableHtml += `<td>${firstname}</td>`;
        tableHtml += `<td>${lastname}</td>`;
        tableHtml += `<td>${salary}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td>${new Date(registerday).toLocaleDateString()}</td>`;
        tableHtml += `<td>${new Date(signintime).toLocaleString()}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
