document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // window.location.href = 'http://localhost:8501/';
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;




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
    .then(response => {
        if (response.ok) {
            // Redirect to Streamlit app if login is successful
            sessionStorage.setItem('username', username);
            window.location.href ='try.html';


       
        } else if (response.status === 401) {
            console.log("Error: 401 (Unauthorized)");
            // Display error message for incorrect username or password
            document.getElementById('loginMessage').textContent = "Incorrect username or password. Please try again.";
          }else {
            // Handle other errors
            console.error('Unexpected error:', response.status);
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
            document.getElementById('registerMessage').classList.remove('loginmessage');
        } else {
            // Registration error
            document.getElementById('registerMessage').textContent = data.message;
            document.getElementById('registerMessage').classList.add('loginmessage');
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

