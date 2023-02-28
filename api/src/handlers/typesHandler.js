const { getAllTypes } = require('../controllers/typesController');


const getAllTypesHandler = async (req, res) => {
    try {
        const results = await getAllTypes();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getAllTypesHandler
}