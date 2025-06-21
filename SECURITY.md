# SECURITY.md

## Security Best Practices for This Project

### 🔒 Environment Variables
- **NEVER** commit `.env` files to Git
- Always use `.env.example` as a template
- Generate strong JWT secrets: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### 🗄️ Database Security
- SQLite database files (`*.sqlite3`, `dev.sqlite3`) are automatically ignored by Git
- Use environment variables for database credentials
- Enable SSL for production PostgreSQL connections

### 🔑 JWT Configuration
- Use strong, randomly generated JWT secrets (64+ characters)
- Set appropriate token expiration times
- Rotate secrets regularly in production

### 📁 Files Excluded from Git
The following sensitive files are automatically ignored:
- `.env` files (all variants)
- Database files (`*.sqlite3`, `*.db`)
- `node_modules/`
- Build directories
- Log files
- User upload directories

### 🚀 Production Deployment
1. Set `NODE_ENV=production`
2. Use strong database passwords
3. Enable HTTPS/SSL
4. Use environment-specific secrets
5. Regular security updates
6. Monitor for vulnerabilities

### 🛡️ Password Security
- Passwords are hashed using bcrypt
- Minimum password requirements enforced
- No plain text passwords stored

### 📝 Setup Instructions
1. Copy `.env.example` to `.env`
2. Update all placeholder values
3. Generate secure JWT secret
4. Configure database credentials
5. Never commit the `.env` file

### ⚠️ Important Notes
- The SQLite database contains user data and is excluded from Git
- All API endpoints validate user authentication
- Input validation is implemented on both client and server
- CORS is configured for the frontend domain
