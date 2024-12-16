const { db } = require("../database/salesManagementDb.js");

const cookieParser = require('cookie-parser');

function login(req, res) {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.query(
        'SELECT * FROM sales_user WHERE username = ?',
        [username],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching data' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Invalid Credentials' });
            }

            const storedPassword = results[0].user_password;

            if (password === storedPassword) {
                const user = results[0];
                return res.status(200).json({
                    message: 'Login successful',
                    id: results[0].id,
                    role: results[0].role,
                    
                });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        }
    );
}

module.exports = { login };
