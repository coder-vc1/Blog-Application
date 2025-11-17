```markdown
# 📝 Mini Blogging Platform

A modern full-stack blogging platform featuring user authentication, complete CRUD operations, and an intelligent AI-powered support assistant. Built with **Java Spring Boot** backend and **Next.js** frontend.

![Mini Blog Platform](https://img.shields.io/badge/Status-Production%20Ready-success)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration with email validation
- JWT-based authentication with BCrypt password hashing
- Persistent sessions with automatic token refresh
- Protected routes and authorization checks

### 📝 Blog Management
- **Create** - Compose and publish blogs with Markdown support
- **Read** - Browse and search all published content
- **Update** - Edit your own blogs with real-time preview
- **Delete** - Remove blogs with confirmation prompts
- Author-based permissions for edit/delete operations

### 🤖 AI Support Assistant
- Intelligent Q&A system powered by knowledge base
- Context-aware keyword matching algorithm
- Instant responses to common platform queries
- Comprehensive FAQ section

### 🎨 Modern UI/UX
- Sleek dark theme with gradient accents
- Animated cards with glowing borders
- Fully responsive mobile-first design
- Smooth transitions and micro-interactions
- Toast notifications and loading states

## 🛠️ Tech Stack

### Backend
- **Java 17** - Core language
- **Spring Boot 3.2.0** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - ORM and database operations
- **MySQL 8.0** - Relational database
- **JWT** - Stateless authentication tokens
- **Lombok** - Code generation and boilerplate reduction
- **ModelMapper** - Object mapping
- **SpringDoc OpenAPI** - Interactive API documentation
- **Maven** - Build and dependency management

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form handling and validation
- **Axios** - Promise-based HTTP client
- **React Hot Toast** - Beautiful notifications
- **React Markdown** - Markdown rendering
- **date-fns** - Date manipulation

## 📁 Project Structure

```
mini-blog-platform/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/blogging/
│   │   ├── config/            # Application configuration
│   │   ├── controller/        # REST API endpoints
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA entities
│   │   ├── exception/        # Custom exception handling
│   │   ├── repository/       # Data access layer
│   │   ├── security/         # Security configuration
│   │   ├── service/          # Business logic
│   │   └── util/             # Helper utilities
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/                   # Next.js application
    ├── app/                   # App router pages
    │   ├── auth/             # Login/Signup pages
    │   ├── blogs/            # Blog CRUD pages
    │   ├── support/          # AI assistant page
    │   ├── layout.tsx        # Root layout
    │   ├── page.tsx          # Home page
    │   └── globals.css       # Global styles
    ├── components/            # Reusable React components
    ├── hooks/                # Custom React hooks
    ├── store/                # Zustand state stores
    ├── types/                # TypeScript definitions
    └── package.json          # Dependencies
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Java 17+**
- **Maven 3.6+**
- **MySQL 8.0+**
- **Node.js 18+**
- **npm** or **yarn**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-blog-platform/backend
   ```

2. **Configure MySQL**
   
   Create and update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/mini_blog_db
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   
   # JWT Configuration
   jwt.secret=your-secret-key-here
   jwt.expiration=86400000
   ```

3. **Create database**
   ```sql
   CREATE DATABASE mini_blog_db;
   ```

4. **Build and run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Verify backend is running**
   - API: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   
   Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open application**
   
   Navigate to `http://localhost:3000`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Authenticate user | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

### Blogs
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/blogs` | Retrieve all blogs | No |
| POST | `/api/blogs` | Create new blog | Yes |
| GET | `/api/blogs/{id}` | Get specific blog | No |
| PUT | `/api/blogs/{id}` | Update blog (author only) | Yes |
| DELETE | `/api/blogs/{id}` | Delete blog (author only) | Yes |

### AI Support
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/query` | Query AI assistant | No |
| GET | `/api/ai/info` | Get AI capabilities | No |

## 🔒 Security Features

- ✅ **Password Security** - BCrypt hashing with salt rounds
- ✅ **Token Authentication** - Stateless JWT with expiration
- ✅ **CORS Protection** - Configured for frontend origin
- ✅ **SQL Injection Prevention** - Parameterized queries via JPA
- ✅ **XSS Protection** - React's built-in sanitization
- ✅ **Input Validation** - Bean Validation + client-side validation
- ✅ **Authorization** - Role-based access control
- ✅ **Error Handling** - Global exception handler with sanitized messages

## 🎯 Usage Guide

### Creating Your First Blog

1. **Sign Up**
   - Navigate to `/auth/signup`
   - Enter email, password (min 6 chars), and optional name
   - Account created and auto-logged in

2. **Write a Blog**
   - Click "Create Blog" button
   - Add title (max 200 characters)
   - Write content with Markdown formatting
   - Preview in real-time
   - Click "Publish"

3. **Manage Your Blogs**
   - View all blogs on homepage
   - Click any blog to read full content
   - Edit/Delete buttons appear only on your blogs
   - Confirm before deletion

4. **Get Help**
   - Navigate to `/support`
   - Ask questions like:
     - "How do I create a blog?"
     - "Can I edit other users' blogs?"
     - "What Markdown features are supported?"

## 🧪 Testing

### Manual Testing Flow

1. **User Registration & Authentication**
   ```
   Open http://localhost:3000
   → Sign Up with test credentials
   → Verify auto-login
   → Check JWT token in localStorage
   ```

2. **Blog Operations**
   ```
   → Create blog with Markdown
   → View in blog list
   → Edit your blog
   → Try editing another user's blog (should fail)
   → Delete your blog
   ```

3. **AI Assistant**
   ```
   → Navigate to /support
   → Ask various questions
   → Verify relevant responses
   ```

### API Testing with Swagger

1. Open `http://localhost:8080/swagger-ui.html`
2. Test signup endpoint: `/api/auth/signup`
3. Copy JWT token from response
4. Click "Authorize" button
5. Enter: `Bearer <your-token>`
6. Test protected endpoints

## 🐛 Troubleshooting

### Common Backend Issues

**Port 8080 already in use**
```bash
# Find process
lsof -i :8080
# Kill process
kill -9 <PID>
```

**Database connection failed**
```bash
# Verify MySQL is running
systemctl status mysql
# Or on macOS
brew services list

# Test connection
mysql -u root -p
```

**JWT token errors**
- Ensure `jwt.secret` is set in `application.properties`
- Check token expiration time
- Verify token format in Authorization header

### Common Frontend Issues

**API connection errors**
```bash
# Verify .env.local
cat .env.local

# Should output:
# NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**Authentication not persisting**
```javascript
// Clear localStorage in browser console
localStorage.clear()
// Refresh page and login again
```

**Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 📈 Performance Optimizations

- **Database**: HikariCP connection pooling for efficient DB access
- **Queries**: Eager fetching with JOIN FETCH to prevent N+1 problems
- **Transactions**: `@Transactional` for atomic operations
- **Frontend**: Next.js automatic code splitting
- **Caching**: Static page generation where applicable
- **Bundle**: Tree shaking and minification in production

## 🚀 Deployment

### Backend Deployment Options

**Railway / Render** (Recommended)
```bash
# Connect GitHub repo
# Set environment variables
# Deploy automatically
```

**AWS EC2**
```bash
# Package application
mvn clean package
# Upload JAR to EC2
# Run with: java -jar app.jar
```

**Docker**
```dockerfile
FROM openjdk:17-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Frontend Deployment

**Vercel** (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel
# Deploy
vercel --prod
```

**Environment Variables**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Database Hosting

- **PlanetScale** - Serverless MySQL with generous free tier
- **AWS RDS** - Managed MySQL service
- **Railway** - Includes database with backend hosting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please ensure:
- Code follows existing style conventions
- All tests pass
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com)

## 📞 Support

Need help? Here's how to get support:

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/repo/discussions)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using Java Spring Boot & Next.js

</div>
```

## Key Improvements Made:

1. **Better Structure** - Added table of contents flow with clear sections
2. **Enhanced Descriptions** - More professional and concise feature descriptions
3. **API Table** - Formatted endpoints as a table for better readability
4. **Security Section** - Expanded with more details
5. **Deployment** - Added practical deployment guides with examples
6. **Troubleshooting** - More comprehensive solutions
7. **Professional Tone** - Consistent, clear, and professional throughout
8. **Better Formatting** - Improved code blocks and section organization
9. **Removed Redundancy** - Eliminated duplicate information
10. **Added Context** - Better explanations where needed

