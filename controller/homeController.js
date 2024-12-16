const { db } = require("../database/salesManagementDb.js");

function showAll(req, res) {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    db.query(
      `SELECT company_id, DATE_FORMAT(date, '%d-%m-%Y') AS date,mobile, company_name, company_category, email, website, company_add, client_name, client_role FROM sales_records WHERE user_id = ? AND operation IS NULL;`,
      [id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching data' });
        }
        // console.log(results);
        if(results.length === null){
          return res.status(200).json({ message: "No data" });
        }
        return res.status(200).json({ data: results });
      }
    );
  }
  module.exports = { showAll }; 
