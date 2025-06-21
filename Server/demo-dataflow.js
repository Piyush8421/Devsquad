const db = require('./src/config/database');

async function demonstrateDataFlow() {
  try {
    console.log('🏠 PROPERTY DATA FLOW DEMONSTRATION');
    console.log('=====================================\n');

    // Step 1: Show current properties (what appears in explore)
    console.log('📋 STEP 1: Current Properties in Explore Section');
    console.log('-'.repeat(50));
    const currentProperties = await db('properties')
      .select('id', 'title', 'city', 'price', 'type', 'is_active')
      .where('is_active', true)
      .orderBy('created_at', 'desc');
    
    console.table(currentProperties);

    // Step 2: Simulate adding a new property (from host start section)
    console.log('\n🏡 STEP 2: Adding New Property (Host Start Section)');
    console.log('-'.repeat(50));
    
    const newPropertyData = {
      host_id: 2, // John Host
      title: 'Cozy Studio in Thamel',
      description: 'Modern studio apartment in the heart of Kathmandu\'s tourist district. Perfect for solo travelers and couples exploring the city.',
      type: 'apartment',
      address: 'Thamel Marg, Kathmandu',
      city: 'Kathmandu',
      state: 'Bagmati',
      country: 'Nepal',
      zip_code: '44600',
      latitude: 27.7172,
      longitude: 85.3240,
      price: 2500.00,
      currency: 'NPR',
      bedrooms: 1,
      bathrooms: 1,
      max_guests: 2,
      amenities: JSON.stringify(['Wi-Fi', 'Kitchen', 'City View', 'Breakfast']),
      images: JSON.stringify(['/placeholder.svg?height=200&width=300']),
      availability: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    };

    console.log('Creating new property:', newPropertyData.title);
    const [newProperty] = await db('properties').insert(newPropertyData).returning('*');
    console.log('✅ Property created with ID:', newProperty.id);

    // Step 3: Show updated properties list (what now appears in explore)
    console.log('\n📋 STEP 3: Updated Properties in Explore Section');
    console.log('-'.repeat(50));
    const updatedProperties = await db('properties')
      .select('id', 'title', 'city', 'price', 'type', 'is_active')
      .where('is_active', true)
      .orderBy('created_at', 'desc');
    
    console.table(updatedProperties);

    // Step 4: Show what the explore API would return
    console.log('\n🔍 STEP 4: Explore API Response (with filters)');
    console.log('-'.repeat(50));
    
    // Simulate API call with Kathmandu filter
    const kathmanduProperties = await db('properties')
      .leftJoin('users', 'properties.host_id', 'users.id')
      .leftJoin(
        db('reviews')
          .select('property_id', db.raw('AVG(rating) as avg_rating'), db.raw('COUNT(*) as review_count'))
          .groupBy('property_id')
          .as('review_stats'),
        'properties.id',
        'review_stats.property_id'
      )
      .select(
        'properties.*',
        'users.first_name as host_first_name',
        'users.last_name as host_last_name',
        db.raw('COALESCE(review_stats.avg_rating, 0) as avgRating'),
        db.raw('COALESCE(review_stats.review_count, 0) as reviewCount')
      )
      .where('properties.is_active', true)
      .where('properties.city', 'LIKE', '%Kathmandu%')
      .orderBy('properties.created_at', 'desc');

    console.log('Properties in Kathmandu:');
    kathmanduProperties.forEach(property => {
      console.log(`• ${property.title} - ${property.price} ${property.currency}/night`);
      console.log(`  Host: ${property.host_first_name} ${property.host_last_name}`);
      console.log(`  Rating: ${property.avgRating || 'No ratings'} (${property.reviewCount} reviews)`);
      console.log('');
    });

    // Step 5: Clean up - remove the test property
    console.log('🧹 STEP 5: Cleaning up test data');
    console.log('-'.repeat(50));
    await db('properties').where('id', newProperty.id).del();
    console.log('✅ Test property removed');

    console.log('\n✨ DATA FLOW COMPLETE!');
    console.log('Host creates property → Saved to database → Appears in explore section');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.destroy();
  }
}

demonstrateDataFlow();
