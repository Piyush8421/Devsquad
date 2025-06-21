exports.up = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.string('payment_intent_id').nullable();
    table.string('payment_method').nullable();
    
    // Add index for payment_intent_id for faster lookups
    table.index('payment_intent_id');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.dropIndex('payment_intent_id');
    table.dropColumn('payment_intent_id');
    table.dropColumn('payment_method');
  });
};
