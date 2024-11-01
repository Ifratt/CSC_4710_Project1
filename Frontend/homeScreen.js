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

const searchBtn2 = document.querySelector('#search-btn2');
searchBtn2.onclick = function () {
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







// Event listener for searching by salary range
 
document.querySelector('#search-salary-btn').onclick = function() {
    const minSalary = document.querySelector('#min-salary').value.trim();
    const maxSalary = document.querySelector('#max-salary').value.trim();

    fetch(`http://localhost:5050/search/salary?min=${minSalary}&max=${maxSalary}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadHTMLTable(data.data);
        })
        .catch(error => console.error('Error fetching salary data:', error));
};

document.querySelector('#search-age-btn').onclick = function() {
    const minAge = document.querySelector('#min-age').value.trim();
    const maxAge = document.querySelector('#max-age').value.trim();

    fetch(`http://localhost:5050/search/age?min=${minAge}&max=${maxAge}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadHTMLTable(data.data);
        })
        .catch(error => console.error('Error fetching age data:', error));
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