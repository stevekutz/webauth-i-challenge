const db = require('../data/dbConfig.js');

module.exports = {
    getColors,
    getWords,
    getFoods,
    add,
}


function getColors() {
    return db('restricto')
    .select('fav_color');
}


function getWords() {
    return db('restricto')
    .select('fav_word');

}

function getFoods() {
    return db('restricto')
    .select('fav_food');
}

function add(color) {
    return db('restricto')
        .insert(color)
        .then(ids => ({id: ids[0]}));
}