# 🏗️ Architecture Overview

## Tech Stack
- Frontend: React, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- Realtime Chat: Socket.io
- Encryption: OpenPGP.js (hybrid AES + RSA)

## Folder Structure
/frontend

/backend

/docs

/.gitignore

## flow diagram
                           ┌────────────────────┐
                           │     Vercel CDN     │
                           │   (React Frontend) │
                           └─────────┬──────────┘
                                     │
                                     ▼
                       ┌────────────────────────────┐
                       │  React (SPA) w/ TailwindCSS│
                       │  - Axios API calls         │
                       │  - Role-based UI           │
                       │  - Secure Chat UI          │
                       └─────────┬──────────────────┘
                                 │
                                 ▼
                  ┌────────────────────────────────────┐
                  │     Express.js Backend (Render)    │
                  │  - REST APIs                       │
                  │  - Authentication (JWT)            │
                  │  - Socket.io for Chat              │
                  └─────────┬────────────┬─────────────┘
                            │            │
                            ▼            ▼
                  ┌────────────────┐   ┌────────────────────┐
                  │   MongoDB Atlas│   │ OpenPGP Encryption │
                  │  - Users       │   │ - AES + RSA Hybrid │
                  │  - Profiles    │   │ - Client-side keys │
                  │  - Jobs, Events│   └────────────────────┘
                  └────────────────┘
