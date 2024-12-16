const {db} = require("../database/salesManagementDb.js");

const markUnattentiveMiddleware = (req, res, next) => {
    const query = `UPDATE sales_records SET unattentive = 'Yes' WHERE last_date = CURDATE() - INTERVAL 1 DAY`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Middleware crash:", err.message);
        }
    });

    next();
};

module.exports = markUnattentiveMiddleware; // Export the function directly
