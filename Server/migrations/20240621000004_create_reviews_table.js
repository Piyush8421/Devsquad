exports.up = function(knex) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('property_id').unsigned().notNullable();
    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.text('comment').notNullable();
    table.timestamps(true, true);
    
    // Foreign keys
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('property_id').references('id').inTable('properties').onDelete('CASCADE');
    
    // Unique constraint - one review per user per property
    table.unique(['user_id', 'property_id']);
    
    // Indexes
    table.index('property_id');
    table.index('rating');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
