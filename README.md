# 🚀 Freelance Marketplace API (Upwork Clone)

![Website Preview](https://res.cloudinary.com/dgagbheuj/image/upload/v1774495924/qimodtcb83kflszta2zc.png)

A powerful **Full-Stack Backend API** for a freelance marketplace platform inspired by Upwork.  
Built with **NestJS, MongoDB, Redis, and Socket.IO**, this system provides real-time communication, project management, contracts, proposals, and notifications.

---

## 🧠 Overview

This project is a **production-ready backend** for a freelance platform where:

- Clients can post projects
- Freelancers can submit proposals
- Contracts manage agreements
- Users can chat in real-time
- Notifications are handled efficiently with Redis
- Clients can review freelancers after project completion

---

## ⚙️ Tech Stack

- **Framework:** NestJS
- **Database:** MongoDB (Mongoose)
- **Caching:** Redis
- **Realtime:** Socket.IO
- **Authentication:** JWT
- **File Uploads:** Cloudinary
- **Password Hashing:** bcrypt
- **Validation:** validator.js

---

## 🔐 Authentication & Roles

The system supports role-based access control:

- `CLIENT`
- `FREELANCER`
- `ADMIN`

### Features:

- Secure JWT authentication
- Custom Guards:
  - AuthGuard
  - ClientGuard
  - FreelancerGuard
  - AdminGuard

---

## 📦 Core Features

### 👤 User System

- User registration & login
- Role-based account creation
- Avatar upload via Cloudinary
- Get user profile
- Admin can delete users

---

### 💼 Projects

- Clients create and manage projects
- Budget types:
  - `FIXED`
  - `HOURLY`
- Project statuses:
  - `OPEN`
  - `IN_PROGRESS`
  - `COMPLETED`
  - `CANCELED`

---

### 📩 Proposals

- Freelancers submit proposals to projects
- Clients can accept/reject proposals
- Auto-reject other proposals when one is accepted

Proposal statuses:

- `PENDING`
- `ACCEPTED`
- `REJECTED`

---

### 📄 Contracts

- Created after proposal acceptance
- Tracks agreement between client and freelancer
- Includes:
  - Agreed price
  - Duration

Contract statuses:

- `ACTIVE`
- `COMPLETED`
- `CANCELLED`

---

### 💬 Real-Time Chat

- Messaging between client and freelancer
- Supports:
  - Text messages
  - Image uploads
- Features:
  - Read/Unread messages
  - Typing indicator (WebSocket)

---

### 🔔 Notifications System

- Real-time notifications using Redis + WebSockets
- Features:
  - Unread count (cached in Redis)
  - Instant push notifications
  - Mark as read / mark all as read
  - Delete notifications

---

### ⭐ Reviews & Ratings

- Clients can review freelancers after contract completion
- Rating categories:
  - Professionalism
  - Communication
  - Quality
  - Expertise
  - Delivery
  - Rehire likelihood
- Automatic average rating calculation

---

### 👨‍💼 Freelancer Profile

- Update:
  - Job title
  - Bio
  - Skills (validated enum)
  - Hourly rate

---

### 🏢 Client Profile

- Update:
  - Company name
  - Bio

---

## ⚡ Real-Time Features (WebSockets)

### Chat Gateway

- Online users tracking
- Typing indicator
- Real-time messaging
- Message seen events

### Notification Gateway

- Multi-device support
- Instant notification delivery
- Real-time sync

---

## 📂 Project Structure

```
backend/
│
├── controllers/   # Handle incoming requests (routes layer)
├── guards/        # Auth & role protection
├── modules/       # Feature modules (Auth, Users, Projects, etc.)
├── schemas/       # Database models (MongoDB / Mongoose)
├── services/      # Business logic layer
├── libs/          # Shared utilities & helpers
├── token/         # JWT & authentication utilities
├── gateways/      # WebSocket (real-time features)
└── main.ts        # Application entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
# App Config
NODE_ENV=production
PORT=6000

# Database
DATABASE_URL=your_mongodb_connection_string_here

# Auth
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=20d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Redis
REDIS_URL=your_redis_connection_string
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ZenZN99/HireHub-Freelance-Platform
cd HireHub-Freelance-Platform
cd backend
```

---

### 2. Install dependencies

```bash
npm intall
```

---

### 3. Run the server

```bash
npm run start:dev
```

---

## 🧪 Testing

This project was tested using **Postman** and manual API testing to ensure reliability and correctness of all endpoints.

### 🔹 Tools Used

- Postman (API Testing)
- Socket.IO Client (Real-time testing)
- MongoDB Compass (Database verification)

---

### 🔹 What Was Tested

- Authentication flow (Signup / Login / JWT validation)
- Role-based access control (Client / Freelancer / Admin)
- Project lifecycle (Create → Update → Status changes)
- Proposals (Submit / Accept / Reject logic)
- Contracts creation after proposal acceptance
- Real-time chat functionality (WebSocket)
- Notifications system (Redis + Socket events)
- CRUD operations for all modules

---

### 🔹 API Validation

- All requests include proper validation using DTOs
- Error handling tested for invalid inputs
- Unauthorized access attempts properly blocked

---

### 🔹 WebSocket Testing

- Message delivery in real-time
- Typing indicators
- Online/offline user tracking
- Notification push events

---

### 🔹 Notes

- All endpoints were tested with **JWT Bearer token authentication**
- Edge cases were considered (missing fields, invalid IDs, unauthorized roles)
- System behaves correctly under normal and error conditions

---

## 🚀 Future Improvements

- 💳 Payment Integration (Coming Soon)
  - Stripe integration
  - PayPal support
  - Wallet system (balance & frozen balance already prepared)

- 📊 Analytics Dashboard
  - User activity insights
  - Project performance metrics
  - Revenue tracking

- 🧠 Smart Freelancer Recommendations
  - AI-based matching system
  - Skill-based project suggestions
  - Ranking & relevance scoring

- 🌍 Multi-language Support
  - Internationalization (i18n)
  - Dynamic language switching
  - RTL/LTR support

---

## 📌 Notes

- Designed with scalability in mind
- Clean architecture using NestJS modules & services
- Optimized with Redis caching for performance
- Real-time ready for modern applications

---

## 👨‍💻 Author

**Built by:** Full-Stack Backend Engineer  
Focused on scalable, production-ready systems using modern backend technologies.

Built with ❤️ by a Staff/Senior Full-Stack Developer aiming to create production-level systems.

⭐ Support

If you like this project, give it a ⭐ on GitHub!
