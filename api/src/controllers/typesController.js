const axios = require('axios');
const { Type } = require('../db');


const getAllTypes = async () => {
    const apiTypesRaw = (await axios('https://pokeapi.co/api/v2/type')).data.results;
    apiTypesRaw.map(async type => {
        await Type.findOrCreate({
            where: { name: type.name}
        })
    });

    const allTypes = await Type.findAll();

    return allTypes;
}


module.exports = {
    getAllTypes
}