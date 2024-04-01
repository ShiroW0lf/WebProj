const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 package
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to SQLite database
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Middleware
app.use(bodyParser.json());

// Define schema and create Users table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route handlers
app.get('/', (req, res) => {
    // This handler sends a response for the root URL ("/")
    res.send('Welcome to my Node.js application!');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match in the database
    db.get('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error('Login error:', err);
            res.status(500).json({ success: false, message: 'Server error' });
        } else if (row) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error('Registration error (check existing user):', err);
            res.status(500).json({ success: false, message: 'Server error' });
        } else if (row) {
            console.error('Registration error: Username already exists');
            res.status(400).json({ success: false, message: 'Username already taken!' });
        } else {
            // Insert new user into the database
            db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], (err) => {
                if (err) {
                    console.error('Registration error (insert new user):', err);
                    res.status(500).json({ success: false, message: 'Server error' });
                } else {
                    console.log('User registered successfully:', username);
                    res.json({ success: true });
                }
            });
        }
    });
});

// Define route for the Welcome page
app.get('/welcome', (req, res) => {
    res.send('Welcome to SAD Analytics page'); // You can modify this to render an HTML page if needed
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Close the database connection when the Node.js process exits
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing SQLite database:', err.message);
        } else {
            console.log('SQLite database connection closed.');
        }
        process.exit();
    });
});
