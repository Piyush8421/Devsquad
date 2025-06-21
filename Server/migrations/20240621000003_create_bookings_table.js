exports.up = function(knex) {
  return knex.schema.createTable('bookings', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('property_id').unsigned().notNullable();
    table.date('check_in').notNullable();
    table.date('check_out').notNullable();
    table.integer('guests').notNullable();
    table.decimal('total_price', 10, 2).notNullable();
    table.text('notes');
    table.enum('status', ['pending', 'confirmed', 'cancelled', 'completed']).defaultTo('pending');
    table.timestamps(true, true);
    
    // Foreign keys
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('property_id').references('id').inTable('properties').onDelete('CASCADE');
    
    // Indexes
    table.index('user_id');
    table.index('property_id');
    table.index('status');
    table.index(['check_in', 'check_out']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bookings');
};
