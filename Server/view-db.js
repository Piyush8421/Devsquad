const db = require('./src/config/database');

async function viewDatabase() {
  try {
    console.log('🗄️  Database Tables:');
    console.log('==================');
    
    // Get all table names
    const tables = await db.raw("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'knex_%'");
    
    for (const table of tables) {
      const tableName = table.name;
      console.log(`\n📋 Table: ${tableName}`);
      console.log('-'.repeat(30));
      
      // Get table structure
      const schema = await db.raw(`PRAGMA table_info(${tableName})`);
      console.log('Columns:', schema.map(col => `${col.name} (${col.type})`).join(', '));
      
      // Get row count
      const count = await db(tableName).count('* as count').first();
      console.log(`Rows: ${count.count}`);
      
      // Show first 3 records if any exist
      if (count.count > 0) {
        const sample = await db(tableName).limit(3);
        console.log('Sample data:');
        console.table(sample);
      }
    }
    
  } catch (error) {
    console.error('Error viewing database:', error);
  } finally {
    await db.destroy();
  }
}

viewDatabase();
