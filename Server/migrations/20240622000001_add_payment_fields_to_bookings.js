exports.up = function(knex) {
  return knex.schema.table('bookings', function(table) {
    table.string('payment_id').nullable();
    table.enum('payment_method', ['card', 'esewa', 'khalti']).nullable();
    table.timestamp('payment_completed_at').nullable();
    
    // Add index for payment_id
    table.index('payment_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('bookings', function(table) {
    table.dropColumn('payment_id');
    table.dropColumn('payment_method');
    table.dropColumn('payment_completed_at');
  });
};
