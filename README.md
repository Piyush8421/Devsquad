# Kostra - Property Rental Platform

A modern, full-stack property rental platform similar to Airbnb, built with Next.js, Node.js, and PostgreSQL. Kostra enables users to list, discover, and book unique accommodations worldwide.

## 🌟 Features

### For Guests
- **Property Discovery**: Browse and search properties with filters
- **Booking System**: Seamless booking experience with payment integration
- **User Dashboard**: Manage bookings, reviews, and profile
- **Review System**: Rate and review stays
- **Safety Features**: Report safety concerns and access guidelines

### For Hosts
- **Property Management**: Easy listing creation and management
- **Host Dashboard**: Track earnings, bookings, and performance
- **Setup Wizard**: Step-by-step property listing process
- **Analytics**: Monitor listing performance and revenue
- **Calendar Management**: Availability tracking

### Platform Features
- **Multi-language Support**: Built-in internationalization
- **Responsive Design**: Works on all devices
- **Authentication**: Secure JWT-based authentication
- **Payment Processing**: Integrated payment system
- **Admin Panel**: Platform management and moderation
- **Company Pages**: About, careers, referral program
- **Safety Center**: Guidelines and reporting system

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **Authentication**: JWT with custom hooks
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Knex.js with migrations
- **Authentication**: JWT tokens
- **Security**: Helmet, bcryptjs, rate limiting
- **Validation**: Joi schemas
- **File Upload**: Multer with image support

## 📁 Project Structure

```
DEVSQUAD/
├── Client/                 # Next.js frontend application
│   ├── app/               # App router pages
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # User dashboards (guest/host)
│   │   ├── explore/       # Property browsing
│   │   ├── host/          # Host-specific pages
│   │   ├── property/      # Property details
│   │   ├── checkout/      # Payment and booking
│   │   └── api/           # API routes
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities and API functions
│   └── public/            # Static assets
├── Server/                # Express.js backend API
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth and validation
│   │   └── config/        # Database configuration
│   ├── migrations/        # Database migrations
│   └── seeds/             # Sample data
└── README.md              # This file
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DEVSQUAD
   ```

2. **Setup Backend**
   ```bash
   cd Server
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run migrate       # Run database migrations
   npm run seed         # Seed with sample data
   npm start            # Start backend server (port 5000)
   ```

3. **Setup Frontend**
   ```bash
   cd ../Client
   npm install
   npm run dev          # Start frontend server (port 3000)
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - API Health Check: `http://localhost:5000/health`

## 🌐 Environment Variables

### Backend (.env in Server directory)
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_NAME=kostra_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local in Client directory)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## 📖 Key Pages & Routes

### Public Pages
- `/` - Homepage with featured properties
- `/explore` - Property search and browsing
- `/property/[id]` - Property detail pages
- `/auth` - Login/registration
- `/company/*` - About, careers, safety, referrals

### Protected Pages
- `/dashboard/guest` - Guest booking management
- `/dashboard/host` - Host property management
- `/checkout` - Payment and booking confirmation

### Host Pages
- `/host` - Become a host landing page
- `/host/create` - Property creation wizard
- `/host/setup/*` - Multi-step listing setup
- `/host/dashboard` - Host management dashboard
- `/host/listing/preview` - Preview your listing

## 🔑 Key Features Implementation

### Property Setup Wizard
Multi-step process for hosts to create listings:
1. **Basic Info**: Property type, location, capacity
2. **Amenities**: Select available amenities
3. **Photos**: Upload property images
4. **Standout**: Description and unique features
5. **Pricing**: Set rates and fees
6. **Publish**: Review and go live

### Booking Flow
1. Property selection and date picking
2. Guest information collection
3. Payment processing with Stripe integration
4. Booking confirmation and management

### Dashboard System
- **Guest Dashboard**: View bookings, past stays, reviews
- **Host Dashboard**: Property performance, earnings, calendar

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints

## 🎨 UI/UX Design

- Modern, clean interface inspired by Airbnb
- Fully responsive design (mobile, tablet, desktop) 
- Dark/light theme support
- Smooth animations and transitions
- Accessible components following WCAG guidelines
- Multi-language support ready

## 📊 Database Schema

### Core Tables
- **users**: User accounts and profiles
- **properties**: Property listings and details
- **bookings**: Booking records and status
- **reviews**: User reviews and ratings

### Migration System
- Automated database migrations
- Seed data for development
- Version control for schema changes

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd Client
npm run build
vercel --prod
```

### Backend (Vercel/Railway/Heroku)
```bash
cd Server
npm run build
# Deploy to your chosen platform
```

### Database
- **Development**: SQLite (included)
- **Production**: PostgreSQL (Supabase/Neon recommended)

## 🧪 Testing

```bash
# Backend tests
cd Server
npm test

# Frontend tests  
cd Client
npm test
```

## 📱 Mobile Responsiveness

The platform is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px+) 
- Tablet (768px+)
- Mobile (320px+)

## 🔧 Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Help

- **Documentation**: Check the README files in Client/ and Server/ directories
- **Issues**: Create an issue on GitHub
- **Email**: support@kostra.com

## 🔮 Future Enhancements

- [ ] Real-time messaging between hosts and guests
- [ ] Advanced search with map integration
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Social features and user profiles
- [ ] Multi-currency support
- [ ] Advanced analytics dashboard
- [ ] Integration with external booking platforms

---

**Kostra** - Making travel accommodation booking simple and secure. 🏠✨
