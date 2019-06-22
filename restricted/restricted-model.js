const db = require('../data/dbConfig.js');

module.exports = {
    getColors,
    addColors,
}


function getColors() {
    return db('restricto');
}

function addColors(color) {
    return db('restricto')
        .insert(color)
        .then(ids => ({id: ids[0]}));
}