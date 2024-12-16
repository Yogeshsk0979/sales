const { db } = require("../database/salesManagementDb.js");

function addStatus(req, res) {
    const { id, user_id } = req.body;

    // Validate input
    if (!id || !user_id) {
        return res.status(400).json({ message: 'Missing id or user_id' });
    }

    // Fetch company_name from sales_records
    db.query('SELECT company_name FROM sales_records WHERE company_id = ?', [id], (err, compRes) => {
        if (err) {
            // console.error('Error fetching company data:', err);
            return res.status(500).json({ message: 'Error fetching company data' });
        }

        // Fetch client details
        db.query(
            'SELECT client_name, client_role, client_phone FROM client_details WHERE company_id = ? AND user_id = ?',
            [id, user_id],
            (err, clientResults) => {
                if (err) {
                    // console.error('Error fetching client data:', err);
                    return res.status(500).json({ message: 'Error fetching client data' });
                }

                // Fetch sales operation details
                db.query(
                    `SELECT next_date,current_status, DATE_FORMAT(entry_date, '%d-%m-%Y') AS entry_date, reason, DATE_FORMAT(next_date, '%d-%m-%Y') AS next_date FROM sales_operation WHERE company_id = ? AND user_id = ?`,
                    [id, user_id],
                    (err, operationResults) => {
                        if (err) {
                            // console.error('Error fetching operation data:', err);
                            return res.status(500).json({ message: 'Error fetching operation data' });
                        }

                        // Send response
                        return res.status(200).json({
                            compRes: compRes,
                            message: clientResults,
                            updateData: operationResults,
                        });
                    }
                );
            }
        );
    });
}

function addDetails(req, res) {
    const { user_id, id, contactsStatus, entryDate, reason, status, nextDate, contacts } = req.body;
    console.log(user_id, id, contactsStatus, entryDate, reason, status, nextDate, contacts);

    let statusDetailss = "sdfs"
    // Validate input
    if (!entryDate || !reason || !status || !nextDate) {
        statusDetailss = null;
    }
    const statusUpdateQuery = `UPDATE sales_records SET operation = ?, last_date = ? WHERE user_id = ? AND company_id = ?`
    const insertClientQuery = `
        INSERT INTO client_details (client_name, client_role, client_phone, company_id, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const insertDetailsQuery = `
        INSERT INTO sales_operation (user_id, company_id, entry_date, reason, current_status, next_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
 
    if (contactsStatus === "empty" && statusDetailss != null) {
        db.query(insertDetailsQuery, [user_id, id, entryDate, reason, status, nextDate], (err) => {
            if (err) {
                // console.error('Error inserting operation data:', err);
                return res.status(500).send({ message: 'Error inserting operation data' });
            }
            db.query(statusUpdateQuery, [status,nextDate, user_id, id], (error) => {
                if (err) {
                    // console.error('Error updating status data:', err);
                    return res.status(500).send({ message: 'Error updating status data' });
                }

                return res.status(200).send({ message: 'Details added successfully' });
            });
        });
    } else if (contactsStatus === "1" && statusDetailss != null) {
        const contact = contacts[0];
        db.query(insertClientQuery, [contact.name, contact.role, contact.number, id, user_id], (err) => {
            if (err) {
                // console.error('Error inserting client data:', err);
                return res.status(500).send({ message: 'Error inserting client data' });
            }
            db.query(insertDetailsQuery, [user_id, id, entryDate, reason, status, nextDate], (err) => {
                if (err) {
                    // console.error('Error inserting operation data:', err);
                    return res.status(500).send({ message: 'Error inserting operation data' });
                }
                db.query(statusUpdateQuery, [status,nextDate, user_id, id], (error) => {
                    if (err) {
                        // console.error('Error updating status data:', err);
                        return res.status(500).send({ message: 'Error updating status data' });
                    }

                    return res.status(200).send({ message: 'Details added successfully' });
                });
            });
        });
    } else if (contactsStatus === "2" && statusDetailss != null) {
        const [contact1, contact2] = contacts;
        db.query(
            `${insertClientQuery}, (?, ?, ?, ?, ?)`,
            [
                contact1.name, contact1.role, contact1.number, id, user_id,
                contact2.name, contact2.role, contact2.number, id, user_id
            ],
            (err) => {
                if (err) {
                    // console.error('Error inserting multiple client data:', err);
                    return res.status(500).send({ message: 'Error inserting multiple client data' });
                }
                db.query(insertDetailsQuery, [user_id, id, entryDate, reason, status, nextDate], (err) => {
                    if (err) {
                        // console.error('Error inserting operation data:', err);
                        return res.status(500).send({ message: 'Error inserting Entry operation data' });
                    }
                    db.query(statusUpdateQuery, [status,nextDate, user_id, id], (error) => {
                        if (err) {
                            // console.error('Error updating status data:', err);
                            return res.status(500).send({ message: 'Error updating status data' });
                        }

                        return res.status(200).send({ message: 'Details added successfully' });
                    });
                });
            }
        );
    } else if (contactsStatus === "1" && statusDetailss === null) {
        const contact = contacts[0];
        db.query(insertClientQuery, [contact.name, contact.role, contact.number, id, user_id], (err) => {
            if (err) {
                console.error('Error inserting client data:', err);
                return res.status(500).send({ message: 'Error inserting client data' });
            }
            return res.status(200).send({ message: 'Details added successfully' });
        })
    } else if (contactsStatus === "2" && statusDetailss === null) {
        const [contact1, contact2] = contacts;
        db.query(
            `${insertClientQuery}, (?, ?, ?, ?, ?)`,
            [
                contact1.name, contact1.role, contact1.number, id, user_id,
                contact2.name, contact2.role, contact2.number, id, user_id
            ],
            (err) => {
                if (err) {

                    return res.status(500).send({ message: 'Error inserting multiple client data ' });
                }
            })
        return res.status(200).send({ message: 'Details added successfully' });
    }
    else {
        return res.status(400).send({ message: 'Invalid contactsStatus value' });
    }
}

module.exports = { addStatus, addDetails };