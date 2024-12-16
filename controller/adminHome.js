const { db } = require("../database/salesManagementDb.js");

function adminTodayRemainder(req, res) {

    const query = `SELECT
    su.username,
    sr.company_id ,
    sr.company_category,
    sr.company_name, 
    sr.client_role, 
    sr.client_name,
    so.reason, 
    sr.website, 
    sr.last_date, 
    sr.operation,
    sr.email, 
    sr.company_add, 
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    su.username AS sales_user_name,
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id 
LEFT JOIN sales_operation so ON sr.last_date = so.next_date 
WHERE 
    sr.last_date = CURDATE() 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    sr.last_date ASC;
`

    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }


        return res.status(200).send({ resultData: result });
    });
}

function adminFollow(req, res) {

    const query = `SELECT 
    sr.company_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.operation = 'follow' 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    CASE 
        WHEN sr.last_date >= CURDATE() THEN 1 
        ELSE 2 -- Past dates
    END,
    sr.last_date ASC; -- Sort within groups
`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }


        return res.status(200).send({ resultData: result });
    });

}

function adminAppointment(req, res) {

    const query = `SELECT 
    sr.company_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.operation = 'appointment' 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    CASE 
        WHEN sr.last_date >= CURDATE() THEN 1 
        ELSE 2 -- Past dates
    END,
    sr.last_date ASC; -- Sort within groups`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }


        return res.status(200).send({ resultData: result });
    });

}

function adminPresentation(req, res) {

    const query = `SELECT 
    sr.company_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.operation = 'presentation' 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    CASE 
        WHEN sr.last_date >= CURDATE() THEN 1 
        ELSE 2 -- Past dates
    END,
    sr.last_date ASC; -- Sort within groups`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }


        return res.status(200).send({ resultData: result });
    });
}

function adminMeeting(req, res) {

    const query = `SELECT 
    sr.company_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.operation = 'meeting' 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    CASE 
        WHEN sr.last_date >= CURDATE() THEN 1 
        ELSE 2 -- Past dates
    END,
    sr.last_date ASC; -- Sort within groups`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }

        return res.status(200).send({ resultData: result });
    });
}

function adminSuccess(req, res) {

    const query = `SELECT 
    sr.company_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.operation = 'success' 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    CASE 
        WHEN sr.last_date >= CURDATE() THEN 1 
        ELSE 2 -- Past dates
    END,
    sr.last_date ASC; -- Sort within groups`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }


        return res.status(200).send({ resultData: result });
    });
}

function adminCancel(req, res) {

    const query = `SELECT 
    sr.company_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.operation = 'cancel' 
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    CASE 
        WHEN sr.last_date >= CURDATE() THEN 1 
        ELSE 2 -- Past dates
    END,
    sr.last_date ASC; -- Sort within groups`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }


        return res.status(200).send({ resultData: result });
    });
}


function adminUnattentive(req, res) {

    const query = `SELECT 
    sr.company_id,
    sr.user_id,
    su.username,
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.operation, 
    sr.company_category, 
    so.reason,
    sr.mobile, 
    DATE_FORMAT(sr.last_date, '%d-%m-%Y') AS last_date, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS entry_date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
    ON sr.user_id = su.id
LEFT JOIN 
    sales_operation so 
    ON sr.last_date = so.next_date
WHERE 
    sr.unattentive is not null and sr.operation != 'success'
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile `
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ resultData: result });
    });
}
function AdminAddUser(req, res) {
    const { username, password } = req.body;  // Extract username and password from the request body

    // Define the SQL query to insert the new user
    const addUser = `INSERT INTO sales_user (username, user_password, role) 
        VALUES (?, ?, ?)`;

    // Execute the query with the provided username, password, and role
    db.query(addUser, [username, password, "emp"], (error, result) => {
        if (error) {
            console.error('Error adding user:', error);
            return res.status(500).send({ message: 'Error adding user' });
        }

        // Send success response
        return res.status(200).send({ message: 'Data added successfully' });
    });
}


function AdminUnattentiveRestore(req, res) {

    const addUser = `UPDATE sales_records SET  unattentive = NULL, last_date = STR_TO_DATE(?, '%d/%m/%Y') WHERE  user_id = ?  AND company_id = ?;`;
    db.query(query, [newDate, user_id, id], (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ resultData: result });
    })
}

function AdminUnattentiveRemove(req, res) {

    const addUser = `UPDATE sales_records SET  unattentive = 'drop' WHERE  user_id = ?  AND company_id = ?;`;
    db.query(query, [user_id, id], (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ resultData: result });
    })
}
const util = require('util');

async function AdminShowDetails(req, res) {
    const { company_id } = req.body;

    if (!company_id) {
        return res.status(400).send({ message: 'Company ID is required' });
    }

    // Current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split('T')[0];

    // Queries
    const clientDetailsQuery = `SELECT client_name,client_role,client_phone FROM client_details WHERE company_id = ?`;
    const salesOperationQuery = `SELECT current_status,DATE_FORMAT(entry_date, '%d-%m-%Y') AS entry_date,DATE_FORMAT(next_date, '%d-%m-%Y') AS next_date, reason, user_id, company_id  FROM sales_operation WHERE company_id = ? ORDER BY next_date desc`;
    const salesRecordQuery = `SELECT DATE_FORMAT(date, '%d-%m-%Y') AS date,company_name,company_category,email,website,company_add,client_name,client_role,DATE_FORMAT(last_date, '%d-%m-%Y') AS last_date, operation FROM sales_records WHERE company_id = ?`;
    const salesUserQuery = `SELECT username FROM sales_user WHERE user_id = ?`;

    // Promisify db.query()
    const query = util.promisify(db.query).bind(db);

    try {
        // Execute queries in parallel
        const [clientDetails, salesOperations, salesRecords] = await Promise.all([
            query(clientDetailsQuery, [company_id]),
            query(salesOperationQuery, [company_id]),
            query(salesRecordQuery, [company_id]),
        ]);

        // Send all results in response
        res.status(200).send({
            clientDetails,
            salesOperations,
            salesRecords,
        });
        // console.log(salesRecords);

    } catch (err) {
        console.error('Error executing queries:', err);
        res.status(500).send({ message: 'Error fetching data', error: err.message });
    }
}
function adminRestore(req, res) {
    const { companyId, userId, operation } = req.body;

    // Validate input
    if (!userId || !companyId || !operation) {
        return res.status(400).send({ message: "Invalid input. All fields are required." });
    }

    // Update sales_records table
    const updateQuery = `
        UPDATE sales_records 
        SET unattentive = NULL, last_date = CURDATE() 
        WHERE user_id = ? AND company_id = ?;
    `;

    db.query(updateQuery, [userId, companyId], (err, results) => {
        if (err) {
            // console.error("Error updating sales_records:", err);
            return res.status(500).send({ message: "Error updating sales records." });
        }

        // Insert operation into sales_operation table
        const insertQuery = `
            INSERT INTO sales_operation (user_id, company_id, entry_date, reason, current_status, next_date)
            VALUES (?, ?, CURDATE(), ?, ?, CURDATE());
        `;

        db.query(insertQuery, [userId, companyId, 'unattentive', operation], (err, result) => {
            if (err) {
                // console.error("Error inserting into sales_operation:", err);
                return res.status(500).send({ message: "Error logging restore operation." });
            }

            res.status(200).send({ message: "Restore operation successful." });
        });
    });
}
function adminReassignShow(req, res) {

    const getUsers = `SELECT 
    COALESCE(su.username, 'Unknown') AS username, 
    sr.user_id,
    sr.company_category, 
    sr.company_id, 
    sr.company_name, 
    sr.client_name, 
    sr.client_role, 
    sr.mobile, 
    DATE_FORMAT(sr.date, '%d-%m-%Y') AS date
FROM 
    sales_records sr
LEFT JOIN 
    sales_user su 
ON 
    sr.user_id = su.id
WHERE 
    sr.date >= CURDATE() 
ORDER BY 
    sr.date DESC;`;
    db.query(getUsers, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Database Error" });
        }
        db.query(`SELECT id, username, id FROM sales_user where role = 'emp'`, (err, results) => {
            if (err) {
                return res.status(500).send({ message: "Database Error" });
            }
            res.status(200).send({
                resultData:result,
                resultUser:results})
        })
        
    })
}

function adminReassignAdd(req, res) {
    const { selectedUserId, selectedCompanyId } = req.body;

    // Validate inputs
    if (!selectedUserId || !selectedCompanyId) {
        return res.status(400).send({ message: "User ID and Company ID are required." });
    }

    const setUsers = `UPDATE sales_records SET user_id = ? WHERE company_id = ?`;

    db.query(setUsers, [selectedUserId, selectedCompanyId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send({ message: "Cannot reassign. Please try again later." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "No record found to update." });
        }

        res.status(200).send({ message: "Successfully reassigned." });
    });
}


module.exports = { adminReassignShow, adminReassignAdd, adminRestore, adminTodayRemainder, adminFollow, adminAppointment, adminPresentation, adminMeeting, adminSuccess, adminCancel, adminUnattentive, AdminAddUser, AdminUnattentiveRemove, AdminUnattentiveRestore, AdminShowDetails };