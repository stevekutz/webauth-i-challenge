
exports.up = async (knex) => {
  await knex.schema.createTable('restricto', tbl => {
    tbl.increments('id');
    tbl.string('fav_color').nullable();
    tbl.string('fav_word').nullable();
    tbl.string('fav_food').nullable();
    tbl.boolean('bool').defaultTo(true);
    tbl.string('pic_URL').defaultTo('https://i.pinimg.com/736x/de/86/65/de8665cb2d4c280389a47405a0d9a0a8--funniest-animals-funny-animals.jpg');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());

  })
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('restricto');
};
