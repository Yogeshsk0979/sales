const { db } = require("../database/salesManagementDb.js");

function addingData(req, res) {
    const {
        companyName,
        id,  // User ID
        entryDate,
        category,
        clientName,
        clientRole,
        clientNumber,
        clientWebsite,
        clientEmail,
        clientAddress
    } = req.body;

    const currentDate = new Date();
    if (new Date(entryDate) < currentDate.setHours(0, 0, 0, 0)) {
        return res.status(400).json({ message: "Entry Date cannot be in the past date" });
    }
    // Insert into sales_records
    const insertSalesQuery = `
        INSERT INTO sales_records (company_name, date, company_category, user_id, mobile, email, company_add, website, client_name,client_role) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSalesQuery, [companyName, entryDate, category, id, clientNumber, clientEmail, clientAddress, clientWebsite, clientName, clientRole], (err, salesResult) => {
        if (err) {
            // console.error("Error inserting sales record:", err);
            return res.status(500).json({ message: 'Error inserting sales record' });
        }

        // Insert into client_details if clientName and clientRole exist
        if (clientName && clientRole) {
            const checkClientQuery = `
                SELECT * FROM client_details 
                WHERE client_name = ? AND client_role = ? AND user_id = ?
            `;

            db.query(checkClientQuery, [clientName, clientRole, id], (err, clientCheckResult) => {
                if (err) {
                    // console.error("Error checking client details:", err);
                    return res.status(500).json({ message: 'Error checking client details' });
                }

                if (clientCheckResult.length === 0) {
                    // Insert new client details
                    const insertClientQuery = `
                        INSERT INTO client_details (client_name, client_role, client_phone, company_id, user_id)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    db.query(insertClientQuery, [clientName, clientRole, clientNumber, salesResult.insertId, id], (err, clientInsertResult) => {
                        if (err) {
                             // console.error("Error inserting client details:", err);
                            return res.status(500).json({ message: 'Error inserting client details' });
                        }
                        return res.status(200).json({ message: 'Client details added successfully' });
                    });
                } else {
                    return res.status(400).json({ message: 'Client already exists' });
                }
            });
        } else {
            return res.status(400).json({ message: 'Client details are incomplete' });
        }
    });
}

module.exports = { addingData };
