document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('loginMessage'); // Get the error message element

    // Send login data to backend
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to dashboard or another page
            window.location.href = '/welcome';
        } else {
            // Display error message on the frontend
            errorMessage.textContent = "Incorrect username or password. Please try again.";
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUsername,
            password: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Registration success
            document.getElementById('registerMessage').textContent = "Account successfully created. Sign in now";
            document.getElementById('registerMessage').classList.remove('error-message');
        } else {
            // Registration error
            document.getElementById('registerMessage').textContent = data.message;
            document.getElementById('registerMessage').classList.add('error-message');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('createAccountLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('createAccountForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('loginMessage').textContent = ""; // Clear any previous error message
});

document.getElementById('backToSignIn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('createAccountForm').style.display = 'none';
    document.getElementById('registerMessage').textContent = ""; // Clear any previous error message
});
