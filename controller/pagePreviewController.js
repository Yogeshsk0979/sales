const { db } = require("../database/salesManagementDb.js");

function showFollowData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.operation = 'follow'
    AND sr.last_date = so.next_date
GROUP BY 
    sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;
`;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}

function showPresentationData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.operation = 'presentation'
    AND sr.last_date = so.next_date
GROUP BY 
  sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;
`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}


function showAppointmentData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.operation = 'appointment'
    AND sr.last_date = so.next_date
GROUP BY 
  sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;
`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}



function showMeetingData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.operation = 'meeting'
    AND sr.last_date = so.next_date
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;
`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}

function showSuccessData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.operation = 'success'
    AND sr.last_date = so.next_date
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;
`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}


function showCancelData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.operation = 'cancel'
    AND sr.last_date = so.next_date
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;
`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}

function showUnattentiveData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.client_name,
    sr.mobile,
    COALESCE(so.entry_date, 'N/A') AS entry_date,
    COALESCE(sr.last_date, 'N/A') AS last_date,
    COALESCE(so.reason, 'N/A') AS reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id
WHERE 
    sr.user_id = 1 
    AND DATE(sr.last_date) = CURDATE() - INTERVAL 1 DAY
    And unattentive = 'yes'
ORDER BY 
    so.next_date ASC;`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}

function showRemainderData(req, res) {
    const { user_id } = req.body;

    // Single query to fetch both follow-up and client details
    const query = `SELECT 
    sr.company_id,
    sr.company_name,
    sr.operation,
    sr.client_name,
    sr.mobile,
    DATE_FORMAT(so.entry_date, '%d-%m-%Y') AS entry_date,
    DATE_FORMAT(so.next_date, '%d-%m-%Y') AS next_date,
    so.reason
FROM 
    sales_records sr
LEFT JOIN 
    sales_operation so 
    ON sr.company_id = so.company_id 
    AND sr.user_id = so.user_id 
    AND sr.last_date >= CURDATE()
WHERE 
    sr.user_id = ? 
    AND sr.last_date = so.next_date
GROUP BY 
   sr.company_id, sr.company_name, sr.client_name, sr.mobile 
ORDER BY 
    so.next_date ASC;`

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send({ message: 'Error fetching data' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        // console.log(results);

        return res.status(200).send({ result: results });
    });
}


module.exports = { showFollowData, showPresentationData, showAppointmentData, showMeetingData, showSuccessData, showCancelData, showUnattentiveData, showRemainderData };
