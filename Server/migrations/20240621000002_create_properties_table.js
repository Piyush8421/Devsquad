exports.up = function(knex) {
  return knex.schema.createTable('properties', function(table) {
    table.increments('id').primary();
    table.integer('host_id').unsigned().notNullable();
    table.string('title', 100).notNullable();
    table.text('description').notNullable();
    table.enum('type', ['apartment', 'house', 'villa', 'cabin', 'hotel']).notNullable();
    table.string('address').notNullable();
    table.string('city', 50).notNullable();
    table.string('state', 50).notNullable();
    table.string('country', 50).notNullable();
    table.string('zip_code', 10).notNullable();
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.decimal('price', 10, 2).notNullable();
    table.string('currency', 3).defaultTo('NPR');
    table.integer('bedrooms').notNullable();
    table.integer('bathrooms').notNullable();
    table.integer('max_guests').notNullable();
    table.json('amenities');
    table.json('images');
    table.boolean('availability').defaultTo(true);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
    
    // Foreign keys
    table.foreign('host_id').references('id').inTable('users').onDelete('CASCADE');
    
    // Indexes
    table.index('host_id');
    table.index('city');
    table.index('type');
    table.index('price');
    table.index('is_active');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('properties');
};
