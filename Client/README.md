# Kostra Frontend

A modern Next.js frontend for the Kostra property rental platform, built with TypeScript and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Clean, responsive design with shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Multi-language**: Internationalization support with context-based translations
- **Authentication**: JWT-based auth with protected routes  
- **Property Management**: Complete property listing and booking system
- **Host Dashboard**: Comprehensive host management interface
- **Guest Dashboard**: User booking and review management
- **Payment Integration**: Secure checkout and payment processing
- **Responsive Design**: Works seamlessly on all devices

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui component library
- **State Management**: React Context API
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **Image Handling**: Next.js Image optimization
- **Routing**: App Router with dynamic routes

## 📁 Project Structure

```
Client/
├── app/                    # App Router pages
│   ├── auth/              # Authentication pages
│   ├── checkout/          # Payment and booking
│   ├── company/           # Company info pages
│   ├── dashboard/         # User dashboards
│   │   ├── guest/         # Guest dashboard
│   │   └── host/          # Host dashboard
│   ├── explore/           # Property browsing
│   ├── help/              # Help and support
│   ├── host/              # Host-specific pages
│   │   ├── create/        # Property creation
│   │   ├── dashboard/     # Host dashboard
│   │   ├── listing/       # Listing management
│   │   ├── resources/     # Host resources
│   │   ├── setup/         # Multi-step setup wizard
│   │   │   ├── amenities/
│   │   │   ├── photos/
│   │   │   ├── pricing/
│   │   │   ├── publish/
│   │   │   └── standout/
│   │   └── start/         # Getting started
│   ├── property/          # Property details
│   │   └── [id]/          # Dynamic property pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── theme-provider.tsx # Theme management
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (50+ components)
├── contexts/              # React contexts
│   ├── auth-context.tsx   # Authentication state
│   └── language-context.tsx # Internationalization
├── hooks/                 # Custom React hooks
│   ├── use-mobile.tsx     # Mobile detection
│   └── use-toast.ts       # Toast notifications
├── lib/                   # Utility functions
│   ├── api/               # API client functions
│   ├── translations.ts    # Translation keys
│   └── utils.ts           # Helper utilities
├── public/                # Static assets
│   ├── placeholder.jpg    # Default images
│   └── placeholder.svg
└── styles/                # Additional styles
    └── globals.css
```

## 🎯 Key Components

### Authentication System
- **Context**: `contexts/auth-context.tsx`
- **Pages**: `app/auth/page.tsx`
- **Features**: Login, registration, protected routes

### Property Management
- **Listing**: `app/property/[id]/page.tsx`
- **Creation**: `app/host/create/page.tsx`
- **Setup Wizard**: `app/host/setup/*`
- **Dashboard**: `app/host/dashboard/page.tsx`

### Booking System
- **Checkout**: `app/checkout/page.tsx`
- **Guest Dashboard**: `app/dashboard/guest/page.tsx`
- **Host Dashboard**: `app/dashboard/host/page.tsx`

### UI Components
- **shadcn/ui**: Modern, accessible component library
- **Custom Components**: Built on top of shadcn/ui base
- **Theme Support**: Light/dark mode ready

## 🔧 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 API Integration

### API Client
Location: `lib/api/index.ts`

Key functions:
- `fetchProperties()` - Get property listings
- `fetchProperty(id)` - Get single property
- `createBooking()` - Create new booking
- `fetchUserBookings()` - Get user bookings
- `login()` / `register()` - Authentication

### Error Handling
- Comprehensive error boundaries
- Toast notifications for user feedback
- Graceful fallbacks for missing data

## 🎨 Styling & Theming

### Tailwind CSS Configuration
- Custom color palette matching Kostra brand
- Responsive breakpoints
- Dark mode support
- Component-specific utilities

### shadcn/ui Components
Included components:
- Buttons, Cards, Inputs, Modals
- Navigation, Tabs, Dropdowns
- Form elements with validation
- Data display components

### Custom Styling
- Global styles in `globals.css`
- Component-specific Tailwind classes
- Responsive design patterns

## 🔒 Authentication & Security

### JWT Implementation
- Token storage in localStorage
- Automatic token refresh
- Protected route middleware
- User session management

### Protected Routes
- Middleware for authentication checks
- Redirect to login for unauthenticated users
- Role-based access control

## 🌍 Internationalization

### Translation System
- **Context**: `contexts/language-context.tsx`
- **Translations**: `lib/translations.ts`
- **Usage**: `const { t } = useLanguage()`

### Language Support
- English (default)
- Nepali
- Extensible for additional languages

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large**: 1440px+

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions

## 🔍 SEO & Performance

### Next.js Optimizations
- Server-side rendering (SSR)
- Static site generation (SSG) where appropriate
- Image optimization with next/image
- Code splitting and lazy loading

### SEO Features
- Dynamic meta tags
- Structured data for properties
- Sitemap generation
- Open Graph tags

## 🧪 Development Workflow

### Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

### Code Quality
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Pre-commit hooks

## 📊 State Management

### React Context
- **AuthContext**: User authentication state
- **LanguageContext**: Internationalization
- **ThemeContext**: Dark/light mode (ready)

### Data Fetching
- Server-side data fetching in page components
- Client-side updates with SWR patterns
- Optimistic updates for better UX

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Environment Variables
Set in deployment platform:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FRONTEND_URL`

### Build Optimization
- Automatic bundle optimization
- Image optimization
- Static asset optimization

## 🔧 Customization

### Adding New Pages
1. Create page in `app/` directory
2. Add to navigation if needed
3. Update translations if applicable

### Adding Components
1. Create in `components/` directory
2. Follow shadcn/ui patterns
3. Add TypeScript interfaces

### Styling Guidelines
- Use Tailwind CSS classes
- Follow responsive design patterns
- Maintain consistency with existing components

## 🐛 Common Issues & Solutions

### Port Conflicts
```bash
# If port 3000 is in use
lsof -ti:3000 | xargs kill -9
```

### Build Errors
- Check TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure environment variables are set

### API Connection Issues
- Verify backend server is running
- Check CORS configuration
- Validate API URLs in environment

## 📚 Documentation

### Component Documentation
Each component includes:
- TypeScript interfaces
- Usage examples
- Props documentation

### API Documentation
- Function signatures in `lib/api/`
- Error handling patterns
- Response type definitions

## 🤝 Contributing

1. Follow existing code patterns
2. Add TypeScript types for new features
3. Update translations for new text
4. Test on multiple screen sizes
5. Ensure accessibility compliance

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Next.js and TypeScript
