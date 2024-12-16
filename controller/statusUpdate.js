const { db } = require("../database/salesManagementDb.js");

async function showupdateStatus(req, res) {
    try {
        const { id, user_id } = req.body;

        // Fetch company name
        const [companyData] = await queryAsync(
            `SELECT company_name FROM sales_records WHERE company_id = ?`,
            [id]
        );
        if (!companyData) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Fetch client details
        const clientDetails = await queryAsync(
            `SELECT client_name, client_role, client_phone 
             FROM client_details 
             WHERE company_id = ? AND user_id = ?`,
            [id, user_id]
        );

        // Fetch sales operation status
        const statusDetails = await queryAsync(
            `SELECT current_status, DATE_FORMAT(entry_date, '%d-%m-%Y') AS entry_date, DATE_FORMAT(next_date, '%d-%m-%Y') AS next_date, reason 
             FROM sales_operation 
             WHERE company_id = ? AND user_id = ? ORDER BY next_date DESC`,
            [id, user_id]
        );

        // Send response
        return res.status(200).json({
            companyName: companyData.company_name,
            clientDetails,
            update: statusDetails,
        });
    } catch (err) {
        // console.error('Error fetching data:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Helper function to promisify db.query
function queryAsync(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


function updateStatus(req, res){
    const { user_id, id, entryDate, reason, status, nextDate } = req.body;
    db.query(`INSERT INTO sales_operation (user_id, company_id, entry_date, reason, current_status, next_date)VALUES (?, ?, ?, ?, ?, ?)`, [user_id, id, entryDate, reason, status, nextDate], (err) => {
        if (err) {
            // console.error('Error inserting operation data:', err);
            return res.status(500).send({ message: 'Error inserting operation data' });
        }
        db.query(`UPDATE sales_records SET operation = ? WHERE user_id = ? AND company_id = ?`, [status, user_id, id], (error) => {
            if (err) {
                // console.error('Error updating status data:', err);
                return res.status(500).send({ message: 'Error updating status data' });
            }
            db.query(`UPDATE sales_records SET operation = ? WHERE user_id = ? AND company_id = ?`, [status, user_id, id], (error) => {
                if (err) {
                    // console.error('Error updating status data:', err);
                    return res.status(500).send({ message: 'Error updating status data' });
                }
                db.query(`UPDATE sales_records SET operation = ?, last_date = ? WHERE user_id = ? AND company_id = ?`, [status, nextDate, user_id, id], (error) => {
                    if (err) {
                        // console.error('Error updating status data:', err);
                        return res.status(500).send({ message: 'Error updating status data' });
                    }
                    return res.status(200).send({ message: 'Details added successfully' });
                });
            
        });
        });
    });
}


module.exports = { showupdateStatus, updateStatus };
