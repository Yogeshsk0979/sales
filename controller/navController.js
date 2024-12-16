const { db } = require("../database/salesManagementDb.js");
function showId(req, res) {
    const {id} = req.body;
    if (!id) {
        return res.status(400).json({ message: 'no id' });
    }

    db.query(
        'SELECT * FROM sales_user WHERE id = ?',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching data' });
            }
            if(results){
                return res.status(200).json({ name: results[0].username});
            }
        }
    )
}
module.exports = { showId };