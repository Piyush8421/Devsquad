const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('reviews').del();
  await knex('bookings').del();
  await knex('properties').del();
  await knex('users').del();

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Insert users
  const users = await knex('users').insert([
    {
      id: 1,
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@kostra.com',
      password: hashedPassword,
      phone: '+977-9800000000',
      role: 'admin',
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'Host',
      email: 'john@example.com',
      password: hashedPassword,
      phone: '+977-9800000001',
      role: 'host',
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      first_name: 'Jane',
      last_name: 'Guest',
      email: 'jane@example.com',
      password: hashedPassword,
      phone: '+977-9800000002',
      role: 'guest',
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Insert properties
  await knex('properties').insert([
    {
      id: 1,
      host_id: 2,
      title: 'Sunny Retreat in Nagarkot',
      description: 'A beautiful mountain retreat with stunning sunrise views over the Himalayas. Perfect for a peaceful getaway with modern amenities and traditional Nepali hospitality.',
      type: 'house',
      address: 'Nagarkot Hill Station',
      city: 'Nagarkot',
      state: 'Bagmati',
      country: 'Nepal',
      zip_code: '44600',
      latitude: 27.7172,
      longitude: 85.5328,
      price: 3500.00,
      currency: 'NPR',
      bedrooms: 2,
      bathrooms: 2,
      max_guests: 4,
      amenities: JSON.stringify(['Wi-Fi', 'Mountain View', 'Breakfast', 'Parking', 'Heater']),
      images: JSON.stringify(['/placeholder.svg?height=200&width=300']),
      availability: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      host_id: 2,
      title: 'Cozy Cabin in Pokhara',
      description: 'Lakeside cabin with beautiful views of Phewa Lake and the Annapurna range. Ideal for adventure seekers and nature lovers.',
      type: 'cabin',
      address: 'Lakeside, Pokhara',
      city: 'Pokhara',
      state: 'Gandaki',
      country: 'Nepal',
      zip_code: '33700',
      latitude: 28.2096,
      longitude: 83.9856,
      price: 5200.00,
      currency: 'NPR',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 6,
      amenities: JSON.stringify(['Lake View', 'Wi-Fi', 'Boating', 'Trekking Guide', 'Kitchen']),
      images: JSON.stringify(['/placeholder.svg?height=200&width=300']),
      availability: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      host_id: 2,
      title: 'Wildlife Lodge in Chitwan',
      description: 'Experience wildlife up close in this eco-friendly lodge located in the heart of Chitwan National Park.',
      type: 'villa',
      address: 'Sauraha, Chitwan National Park',
      city: 'Chitwan',
      state: 'Narayani',
      country: 'Nepal',
      zip_code: '44200',
      latitude: 27.5786,
      longitude: 84.4951,
      price: 2800.00,
      currency: 'NPR',
      bedrooms: 2,
      bathrooms: 1,
      max_guests: 4,
      amenities: JSON.stringify(['Safari', 'Wildlife View', 'Restaurant', 'Guide', 'Nature Walk']),
      images: JSON.stringify(['/placeholder.svg?height=200&width=300']),
      availability: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Insert sample bookings
  await knex('bookings').insert([
    {
      id: 1,
      user_id: 3,
      property_id: 1,
      check_in: '2024-07-01',
      check_out: '2024-07-03',
      guests: 2,
      total_price: 7000.00,
      status: 'confirmed',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Insert sample reviews
  await knex('reviews').insert([
    {
      id: 1,
      user_id: 3,
      property_id: 1,
      rating: 5,
      comment: 'Amazing place with breathtaking views! The sunrise from the balcony was unforgettable. Highly recommended for anyone looking for a peaceful retreat.',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
