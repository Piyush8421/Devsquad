const db = require('./src/config/database');

async function listUsers() {
  try {
    console.log('👥 Existing Users on Your Website');
    console.log('================================\n');
    
    const users = await db('users').select('*').orderBy('id');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.first_name} ${user.last_name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   📱 Phone: ${user.phone}`);
      console.log(`   👤 Role: ${user.role.toUpperCase()}`);
      console.log(`   ✅ Verified: ${user.is_verified ? 'Yes' : 'No'}`);
      console.log(`   🟢 Active: ${user.is_active ? 'Yes' : 'No'}`);
      console.log(`   📅 Created: ${new Date(user.created_at).toLocaleDateString()}`);
      console.log('   ' + '-'.repeat(50));
    });
    
    console.log(`\n📊 Total Users: ${users.length}`);
    
    // Show user statistics
    const roleStats = await db('users')
      .select('role')
      .count('* as count')
      .groupBy('role');
    
    console.log('\n📈 User Statistics by Role:');
    roleStats.forEach(stat => {
      console.log(`   ${stat.role.toUpperCase()}: ${stat.count} users`);
    });
    
  } catch (error) {
    console.error('❌ Error fetching users:', error);
  } finally {
    await db.destroy();
  }
}

listUsers();
