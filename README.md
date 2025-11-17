
---

# 📝 Mini Blog Application

A modern **full-stack blogging platform** with secure authentication, full CRUD blog management, and an intelligent **AI-powered support assistant**.
Built using **Java Spring Boot** (backend) and **Next.js 14** (frontend), optimized for performance, security, and clean architecture.

---

## 🚀 Highlights

* 🔐 **Secure Authentication** (JWT + BCrypt + role-based access)
* 📝 **Complete Blog CRUD** with Markdown & real-time preview
* 🤖 **AI Assistant** for FAQs and platform guidance
* 🎨 **Modern UI/UX** with Tailwind and responsive design
* ⚡ **Fast, Production-Ready Architecture**
* 📚 **Fully documented APIs via Swagger**

---

## 📌 Table of Contents

* Features
* Tech Stack
* Architecture
* Project Structure
* Setup Guide (Backend + Frontend)
* API Documentation
* Security Features
* Usage Guide
* Testing Guide
* Troubleshooting
* Performance Optimizations
* Deployment
* Contributing
* License
* Author

---

## ✨ Features

### 🔐 Authentication

* Email registration with validation
* Secure login using JWT
* Auto-refresh logic for smooth sessions
* Protected routes & authorization rules

### 📝 Blog Management (CRUD)

* Rich Markdown editor
* Create, read, update, and delete blogs
* Author-only permissions for edit/delete
* Responsive blog cards & detail view
* Search-enabled blog listing

### 🤖 AI Support Assistant

* Knowledge-base powered Q&A
* Detects keywords & context
* Helps users navigate platform features

### 🎨 UI/UX

* Elegant dark theme
* Fluid transitions & animations
* Mobile-first responsive layout
* Global toasts, loaders, and empty states

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot 3 (Web, Security, JPA)
* MySQL 8
* ModelMapper, Lombok
* JWT Authentication
* SpringDoc (OpenAPI/Swagger)

### Frontend

* Next.js 14 (App Router)
* React 18 + TypeScript
* Tailwind CSS
* Zustand (global state)
* Axios
* React Markdown
* date-fns

---

## 🧱 Architecture Overview

```
Frontend (Next.js) ───► REST API (Spring Boot) ───► MySQL Database
         ▲                         │
         │                         ▼
         └────────── AI Assistant + Security Layer
```

* **Frontend** handles UI, routing, and state
* **Backend** exposes REST APIs with authentication
* **MySQL** stores users & blogs
* **AI module** processes knowledge-based queries

---

## 📁 Project Structure

```
mini-blog-platform/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── exception/
│   ├── repository/
│   ├── security/
│   ├── service/
│   └── util/
└── frontend/
    ├── app/
    ├── components/
    ├── hooks/
    ├── store/
    ├── types/
    └── public/
```

---

# 🚀 Getting Started

## Backend Setup

```bash
git clone <repository-url>
cd mini-blog-platform/backend
```

### Configure MySQL

`src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mini_blog_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

jwt.secret=YOUR_SECRET
jwt.expiration=86400000
```

### Run Backend

```bash
mvn clean install
mvn spring-boot:run
```

### Access

* API Base: `http://localhost:8080`
* Swagger: `http://localhost:8080/swagger-ui.html`

---

## Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Run:

```bash
npm run dev
```

App is available at:
👉 `http://localhost:3000`

---

# 📚 API Endpoints

### Authentication

| Method | Endpoint           | Description       | Auth |
| ------ | ------------------ | ----------------- | ---- |
| POST   | `/api/auth/signup` | Register user     | ❌    |
| POST   | `/api/auth/login`  | Login & get token | ❌    |
| GET    | `/api/auth/me`     | Current user      | ✔️   |

### Blog APIs

| Method | Endpoint          | Description          | Auth |
| ------ | ----------------- | -------------------- | ---- |
| GET    | `/api/blogs`      | List all blogs       | ❌    |
| POST   | `/api/blogs`      | Create blog          | ✔️   |
| GET    | `/api/blogs/{id}` | Get a blog           | ❌    |
| PUT    | `/api/blogs/{id}` | Update (author only) | ✔️   |
| DELETE | `/api/blogs/{id}` | Delete (author only) | ✔️   |

### AI Assistant

| Method | Endpoint        | Description    | Auth |
| ------ | --------------- | -------------- | ---- |
| POST   | `/api/ai/query` | Ask a question | ❌    |

---

# 🔒 Security Features

* BCrypt password hashing
* Stateless JWT auth
* CSRF-safe (token-based architecture)
* CORS configured for frontend
* SQL Injection prevention via JPA
* Unified exception handling
* Role-based access control (future-proof)

---

# 🧪 Testing Guide

### Authentication Tests

* Sign up → auto-login
* Verify JWT stored correctly
* Hit `/auth/me` with token

### Blog Tests

* Create → Read → Update → Delete
* Attempt editing someone else’s blog (should fail)

### AI Assistant Tests

* Ask predefined queries
* Validate contextual responses

---

# 🐛 Troubleshooting

### Backend Issues

**Port 8080 in use?**

```bash
lsof -i :8080
kill -9 <PID>
```

**MySQL connection errors?**

```bash
mysql -u root -p
```

**JWT: “Expired/Invalid token”**

* Check `jwt.secret`
* Adjust expiry in milliseconds

---

### Frontend Issues

**API errors**

```bash
cat .env.local
```

**CORS errors**

* Check backend CORS config
* Ensure correct origin

**Frontend not rebuilding**

```bash
rm -rf .next node_modules
npm install
```

---

# ⚙️ Performance Optimizations

* HikariCP pooling
* JPA optimized fetch strategies
* Next.js code splitting
* Markdown rendering optimized
* API caching (future enhancement)

---

# 🚀 Deployment Guide

### Backend Options

* **Railway / Render** (easy CI/CD)
* **AWS EC2** (manual deploy)
* **Docker:**

```dockerfile
FROM openjdk:17-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Frontend Deployment

**Vercel (Recommended)**

```
vercel --prod
```

---

# 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open PR

---

# 📝 License

Licensed under the **MIT License**.

---

# 👨‍💻 Author

Email: `vicky.nits2907@gmail.com`

---

<div align="center">

⭐ If you like this project, consider giving it a star!

Built with ❤️ using Spring Boot & Next.js

</div>

---
