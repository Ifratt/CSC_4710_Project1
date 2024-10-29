document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('#login-btn');
    loginBtn.onclick = function() {
        const username = document.querySelector('#username-input').value;
        const password = document.querySelector('#password-input').value;

        if (!username || !password) {
            document.getElementById('login-message').innerText = "Please enter both username and password.";
            return;
        }

        fetch('http://localhost:5050/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('login-message').innerText = "Login successful!";
                window.location.href = 'homeScreen.html';
            } else {
                document.getElementById('login-message').innerText = data.message;
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('login-message').innerText = "An error occurred. Please try again.";
        });
    };
});
