# CampusConnect

### A private social and collaboration platform for colleges

CampusConnect is a multi-tenant campus community platform that gives colleges their own private digital workspace for students and teachers.

It combines social networking, academic collaboration, campus communities, events, assignments, and messaging into a single platform.

The core experience is similar to a private social network for a college, with community and communication features inspired by modern platforms such as Instagram, LinkedIn, Slack, and Discord.

---

## Overview

A college can register directly on CampusConnect and create its own workspace.

Once a college is registered, its owner can manage the college environment, invite teachers and students, create departments, organize clubs and events, and manage the campus community.

Students and teachers can then interact through:

- Social posts
- Comments and likes
- Clubs
- Events
- Assignments
- Announcements
- Direct messaging
- Notifications
- Profiles

Each college operates as an isolated tenant. Users can only access content belonging to their college.

---

# Core Concept

```text
                    CampusConnect
                          │
                    College Workspace
                          │
          ┌───────────────┼────────────────┐
          │               │                │
       Students        Teachers         Owner
          │               │                │
          └───────────────┼────────────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
           Community              Academics
              │                       │
        Posts / Clubs             Assignments
        Events / Chat             Announcements
        Comments                  Submissions
```

---

# Features

## Authentication

CampusConnect provides a complete authentication flow.

- College registration
- User login
- Email verification
- Forgot password
- Reset password
- OTP verification
- Secure password handling
- JWT-based authentication
- Protected routes
- Role-based authorization
- Session management

### Authentication Flow

```text
Register College
       │
       ▼
College + Owner Details
       │
       ▼
Email Verification
       │
       ▼
College Workspace Created
       │
       ▼
Owner Dashboard
       │
       ▼
Invite Students / Teachers
```

---

# Multi-Tenancy

CampusConnect is designed as a multi-tenant application.

Each college receives an isolated workspace.

```text
CampusConnect
│
├── College A
│   ├── Students
│   ├── Teachers
│   ├── Departments
│   ├── Posts
│   ├── Clubs
│   └── Events
│
├── College B
│   ├── Students
│   ├── Teachers
│   ├── Departments
│   ├── Posts
│   ├── Clubs
│   └── Events
│
└── College C
    ├── Students
    ├── Teachers
    ├── Departments
    ├── Posts
    ├── Clubs
    └── Events
```

Data from one college must never be accessible to users belonging to another college.

---

# User Roles

## College Owner

The owner is the account that creates the college workspace.

Capabilities:

- Manage college profile
- Manage departments
- Invite students
- Invite teachers
- Manage clubs
- Manage events
- Publish announcements
- View college-level statistics

---

## Teacher

Teachers can participate in both academic and community activities.

Capabilities:

- Create posts
- Comment on posts
- Like posts
- Create announcements
- Create assignments
- Review submissions
- Create events
- Participate in clubs
- Message students
- Manage their profile

---

## Student

Students are members of the college community.

Capabilities:

- Create posts
- Upload images
- Like posts
- Comment
- Follow users
- Save posts
- Join clubs
- Register for events
- Submit assignments
- Message other users
- Manage their profile

---

# Dashboard

The dashboard provides a personalized overview of the user's college activity.

## Student Dashboard

- Recent posts
- Upcoming events
- Pending assignments
- Club activity
- Notifications
- Recent conversations

## Teacher Dashboard

- Assignment statistics
- Pending submissions
- Recent posts
- Upcoming events
- Student activity
- Notifications

## College Owner Dashboard

- Total students
- Total teachers
- Departments
- Clubs
- Events
- Recent activity
- College statistics

---

# Social Feed

The feed is the central community experience.

Users can:

- Create posts
- Edit posts
- Delete posts
- Upload multiple images
- Like posts
- Comment
- Save posts
- Share post links
- Report posts

A post can contain:

```text
Author
Avatar
Timestamp
Caption
Images
Like count
Comment count
```

The feed supports pagination/infinite scrolling.

---

# Profiles

Every user has a public profile within their college.

Profile information includes:

- Profile picture
- Cover image
- Name
- Bio
- Department
- Semester
- Designation
- Skills
- Interests
- Followers
- Following
- Posts
- Saved posts

Users can update their profile information and profile images.

---

# Explore

Explore allows users to discover content and people within their college.

Users can search for:

- Students
- Teachers
- Posts
- Clubs
- Events

Available filters include:

- Department
- Semester
- Recent
- Popular

---

# Clubs

Clubs provide dedicated communities inside a college.

Examples:

- Coding Club
- Photography Club
- Robotics Club
- Sports Club
- Entrepreneurship Club

Club features:

- Club profile
- Description
- Banner
- Members
- Posts
- Events
- Join/leave functionality

---

# Events

Colleges, teachers, and authorized users can create campus events.

Examples:

- Workshops
- Seminars
- Hackathons
- Competitions
- Cultural events
- Club events

Event information includes:

- Title
- Banner
- Description
- Organizer
- Date
- Time
- Venue
- Attendees

Students can register for events and cancel their registration.

---

# Assignments

Teachers can create and manage assignments.

### Teacher

- Create assignment
- Add description
- Attach files
- Set deadline
- View submissions
- Review submissions

### Student

- View assignments
- Download attachments
- Upload submission
- View submission status

---

# Messaging

CampusConnect includes real-time one-to-one messaging.

Features:

- Direct messages
- Real-time delivery
- Message history
- Seen status
- Typing indicator
- Image sharing

WebSockets are used for real-time communication.

---

# Notifications

Users receive notifications for important activity.

Examples:

- Someone liked your post
- Someone commented on your post
- Someone followed you
- New assignment
- Event reminder
- Club invitation
- New message

---

# Saved Posts

Users can save posts for later.

Features:

- Save post
- Remove saved post
- View saved posts

---

# College Management

The College Owner can manage the basic college structure.

## Departments

- Create department
- Edit department
- Delete department

## Students

- Invite student
- Remove student
- View student

## Teachers

- Invite teacher
- Remove teacher
- View teacher

---

# File Management

CampusConnect supports uploads for:

- College logos
- Profile pictures
- Cover images
- Post images
- Assignment attachments
- Message attachments

File storage is abstracted so the storage provider can be changed independently from the application.

---

# Notifications Architecture

Notifications are generated from application events.

```text
User Action
    │
    ▼
Backend Event
    │
    ▼
Notification Service
    │
    ├── Database
    │
    └── WebSocket
             │
             ▼
          User UI
```

---

# Technology Stack

## Frontend

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- Axios

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic
- Alembic
- PostgreSQL
- JWT
- WebSockets

## Infrastructure

- PostgreSQL
- Object Storage
- Redis — optional
- Docker
- Nginx
- CI/CD

---

# Architecture

```text
                         Client
                           │
                           ▼
                    Next.js Frontend
                           │
                           │ HTTPS
                           ▼
                     FastAPI API
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
          PostgreSQL     Storage       Redis
              │                         │
              │                         │
              └────────────┬────────────┘
                           │
                       WebSocket
                           │
                           ▼
                    Realtime Clients
```

---

# Backend Modules

```text
backend/
│
├── auth
├── users
├── colleges
├── departments
├── posts
├── comments
├── likes
├── followers
├── clubs
├── events
├── assignments
├── submissions
├── conversations
├── messages
├── notifications
├── uploads
└── search
```

---

# Database

Core entities:

```text
College
User
Role
Department

Post
PostImage
Comment
Like
SavedPost
Follower

Club
ClubMember

Event
EventRegistration

Assignment
Submission

Conversation
Message

Notification
Upload
```

Relationships must enforce college-level isolation.

---

# Frontend Structure

```text
src/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   │
│   └── (dashboard)/
│       ├── dashboard/
│       ├── feed/
│       ├── explore/
│       ├── clubs/
│       ├── events/
│       ├── assignments/
│       ├── messages/
│       ├── notifications/
│       ├── profile/
│       └── settings/
│
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

---

# Backend Structure

```text
backend/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── repositories/
│   ├── dependencies/
│   ├── websocket/
│   ├── workers/
│   └── main.py
│
├── alembic/
├── tests/
├── Dockerfile
└── requirements.txt
```

---

# Design System

CampusConnect follows a modern SaaS design language.

Design references:

- Linear
- Vercel
- GitHub
- Clerk
- Notion

Principles:

- Minimal visual noise
- Strong typography
- Consistent spacing
- Clear hierarchy
- Responsive layouts
- Accessible components
- Light and dark themes
- Reusable UI primitives

### Core UI

- Buttons
- Inputs
- Selects
- Dropdowns
- Dialogs
- Drawers
- Tabs
- Tables
- Cards
- Avatars
- Badges
- Tooltips
- Toasts
- Skeleton loaders
- Empty states
- Error states

---

# Authentication Screens

```text
/auth

├── Login
├── Register College
├── Forgot Password
├── Reset Password
└── Verify Email
```

College registration is publicly accessible.

There is currently no separate Super Admin or platform-level approval process.

---

# Security

The application must enforce:

- Password hashing
- JWT authentication
- Refresh-token security
- Role-based authorization
- College-level authorization
- Input validation
- File type validation
- File size limits
- Rate limiting
- Secure HTTP headers
- CORS configuration
- SQL injection protection
- Ownership checks
- API-level permission checks

Frontend route protection alone is not considered authorization. Every protected operation must be validated by the backend.

---

# API Principles

The backend follows REST conventions.

Example:

```text
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/verify-email

GET    /api/posts
POST   /api/posts
GET    /api/posts/{id}
PATCH  /api/posts/{id}
DELETE /api/posts/{id}

POST   /api/posts/{id}/like
POST   /api/posts/{id}/comments

GET    /api/clubs
POST   /api/clubs

GET    /api/events
POST   /api/events

GET    /api/assignments
POST   /api/assignments
POST   /api/assignments/{id}/submit
```

---

# Development Roadmap

## Phase 1 — Foundation

- Project setup
- Database
- Authentication
- College registration
- Email verification
- Login
- Password reset
- Role-based authorization
- Base layout
- Design system

## Phase 2 — Community

- Profiles
- Feed
- Posts
- Images
- Likes
- Comments
- Saved posts
- Followers

## Phase 3 — Campus

- Departments
- Clubs
- Events
- Announcements
- Search
- Notifications

## Phase 4 — Academics

- Assignments
- File attachments
- Submissions
- Teacher review

## Phase 5 — Communication

- Conversations
- Real-time messaging
- WebSockets
- Seen status
- Typing indicator

## Phase 6 — Production

- Testing
- Error handling
- Logging
- Performance optimization
- Security hardening
- Docker
- CI/CD
- Production deployment

---

# Future Roadmap

The following features are intentionally outside the current MVP.

- Platform Super Admin
- College Admin panel
- Subscription and billing
- Multi-college platform analytics
- AI content moderation
- AI-powered search
- AI caption generation
- Stories
- Video posts
- Group chat
- Voice/video calls
- Marketplace
- Placement portal
- Attendance
- QR attendance
- Live classes
- Mobile application
- Push notifications

---

# Current MVP Boundary

The first production milestone focuses on:

```text
Authentication
      +
Multi-Tenancy
      +
Profiles
      +
Social Feed
      +
Clubs
      +
Events
      +
Assignments
      +
Messaging
      +
Notifications
```

There is **no Super Admin or College Admin panel in the current version**.

A college registers directly through the public registration flow, creates its workspace, and the registered owner manages the college from within the application.

---

# Project Goal

CampusConnect aims to provide colleges with a single private platform for:

**Community + Communication + Collaboration + Academics**

instead of forcing students and teachers to use separate platforms for social interaction, announcements, clubs, events, assignments, and messaging.
