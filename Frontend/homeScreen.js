document.addEventListener('DOMContentLoaded', function() {
    // one can point your browser to http://localhost:5050/getAll to check what it returns first.
    fetch('http://localhost:5050/getAll')     
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

// Update selectors for the search button and options
document.querySelector('#search-btn').onclick = function() {
    const options = document.querySelector('#search-options').value; // Add '#'

    switch (options) {
        case 'joinedAfterJohn':
            fetchUsersAfterJohn(); 
            break;
        case 'neverSignedIn':
            fetchUsersNeverSignedIn();
            break;
        case 'registeredOnSameDayAsJohn':
            fetchUsersRegisteredOnSameDayAsJohn();
            break;
        case 'registeredToday':
            fetchUsersRegisteredToday();
            break;
        default:
            alert("Please select a valid option.");
    }
};

// Fetch functions remain the same
function fetchUsersAfterJohn() {
    fetch('http://localhost:5050/search/joinedAfterJohn')
        .then(response => response.json())
        .then(data => loadHTMLTable(data.data))
        .catch(err => {
            console.error(err);
            alert("An error occurred.");
        });
}

function fetchUsersNeverSignedIn() {
    fetch('http://localhost:5050/search/neverSignedIn')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']))
        .catch(err => {
            console.error(err);
            alert("An error occurred");
        });
}

function fetchUsersRegisteredOnSameDayAsJohn() {
    fetch('http://localhost:5050/search/registeredOnSameDayAsJohn')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']))
        .catch(err => {
            console.error(err);
            alert("An error occurred");
        });
}

function fetchUsersRegisteredToday() {
    fetch('http://localhost:5050/search/registeredToday')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']))
        .catch(err => {
            console.error(err);
            alert("An error occurred");
        });
}

function loadHTMLTable(data) {
    console.log("loadHTMLTable called."); // Debugging

    const table = document.querySelector('table tbody'); 

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({ username, firstname, lastname, salary, age, registerday, signintime }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${username}</td>`;
        tableHtml += `<td>${firstname}</td>`;
        tableHtml += `<td>${lastname}</td>`;
        tableHtml += `<td>${salary}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td>${new Date(registerday).toLocaleDateString()}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
