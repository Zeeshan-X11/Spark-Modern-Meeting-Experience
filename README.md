# SparkMeet | Real-Time Meeting & Collaboration Platform

A full-stack, Zoom-inspired web application designed to make online meetings and collaboration accessible through a modern browser-based experience.

**SparkMeet** brings together a React frontend, Node.js and Express backend, Socket.IO-based real-time communication, and MongoDB persistence in a cloud-deployed application.

<p align="left">
  <a href="https://sparkmeet-web.onrender.com/home"><strong>Live Demo</strong></a> ·
  <a href="https://github.com/Zeeshan-X11/Spark-Modern-Meeting-Experience"><strong>Source Code</strong></a>
</p>

---

## Overview

SparkMeet is a full-stack web development project inspired by modern video conferencing platforms. It explores the integration of interactive frontend components, backend APIs, real-time client-server communication, database operations, and cloud deployment.

The project focuses on building a maintainable application with a clear separation between the frontend and backend.

## Key Features

- **Meeting experience:** A browser-based interface for online meetings and collaboration.
- **Real-time communication:** Socket.IO integration for event-driven communication between clients and the server.
- **Screen sharing:** A meeting interface that supports a dedicated remote screen-sharing presentation experience.
- **REST API integration:** HTTP communication between the React frontend and Express backend.
- **User interface:** Component-based UI built with React and Material UI.
- **Database integration:** MongoDB connectivity through Mongoose.
- **Authentication-related components:** Authentication interface and backend password-hashing dependency using bcrypt.
- **Cloud deployment:** Separate frontend and backend services hosted on Render.

*Document specific capabilities such as working audio/video calls, room management, authentication flows, chat, or participant controls only after verifying the corresponding implementation in the source code.*

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React 18, JavaScript |
| UI / Component Library | Material UI |
| Routing | React Router |
| HTTP Client | Axios |
| Real-Time Communication | Socket.IO Client, Socket.IO |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Security Utility | bcrypt |
| Cross-Origin Requests | CORS |
| Deployment | Render |
| Configuration | Environment variables |

## System Architecture

```text
                 ┌──────────────────────────┐
                 │       Web Browser        │
                 │                          │
                 │       React 18           │
                 │       Material UI        │
                 │       React Router       │
                 │       Axios              │
                 │       Socket.IO Client   │
                 └────────────┬─────────────┘
                              │
                  ┌───────────┴───────────┐
                  │                       │
              HTTPS / REST           Socket.IO
                  │                       │
                  ▼                       ▼
                 ┌──────────────────────────┐
                 │    Node.js + Express     │
                 │                          │
                 │       API Routes         │
                 │   Application Logic      │
                 │    Socket.IO Server      │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │        MongoDB           │
                 │     Mongoose ODM         │
                 │   Persistent App Data    │
                 └──────────────────────────┘

                  Deployment: Render
<img width="1152" height="741" alt="Screenshot 2026-10-21 095204" src="https://github.com/user-attachments/assets/f16f1347-bbc5-4f17-b49b-2a600014df9a" />

```

### Request and Communication Flow

1. A user opens the React application in a web browser.
2. React renders the interface and React Router handles client-side navigation.
3. Axios sends HTTP requests to the Express backend.
4. Socket.IO manages real-time event communication between connected clients and the backend.
5. The backend processes application requests and uses Mongoose to interact with MongoDB.
6. The deployed frontend and backend communicate through configured environment variables and allowed origins.

**Media architecture:** Socket.IO is used for real-time event communication; it is not itself an audio/video transport protocol. If the project implements WebRTC, document its peer-connection and signaling flow separately.

## Project Structure

The following illustrates the main application areas. Check the repository before treating this as an exhaustive file tree.

```text
Spark-Modern-Meeting-Experience/
├── backend/
│   └── src/
│       ├── app.js
│       ├── controllers/
│       └── routes/
│
├── frontend/
│   └── src/
│       ├── App.js
│       ├── pages/
│       └── styles/
│
├── render.yaml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- A MongoDB database or MongoDB Atlas connection

### 1. Clone the Repository

```bash
git clone https://github.com/Zeeshan-X11/Spark-Modern-Meeting-Experience.git
cd Spark-Modern-Meeting-Experience
```

### 2. Install Dependencies

Open separate terminals for the frontend and backend.

```bash
cd backend
npm ci
```

```bash
cd frontend
npm ci
```

If your project doesn't have a `package-lock.json` in either directory, use `npm install` instead.

### 3. Configure Environment Variables

Configure the environment variables used by your application.

**Frontend — `.env`**

```env
REACT_APP_SERVER_URL=http://localhost:YOUR_BACKEND_PORT
```

**Backend — `.env`**

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace the backend port with the actual port configured in your server. Add any other variables required by your implementation.

Never commit database credentials, authentication secrets, or other private environment values.

### 4. Start the Application

Start the backend using its configured npm script:

```bash
cd backend
npm start
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm start
```

Open the local URL printed by the frontend development server.

Refer to each directory's `package.json` if the available scripts differ from these examples.

## Deployment

SparkMeet is deployed using Render.

- **Frontend service:** `sparkmeet-web`
- **Backend service:** `sparkmeet-api`
- **Live application:** https://sparkmeet-web.onrender.com/home

Deployment configuration includes the frontend build, backend startup, environment variables, and routing for the single-page application.

For production deployments, configure the backend URL, database connection, and CORS allowed origins correctly. Keep secrets in the hosting provider's environment settings rather than in source code.

## Engineering Concepts Demonstrated

- Full-stack web application development
- Client-server architecture
- RESTful API integration
- Event-driven communication
- Socket.IO client-server messaging
- MongoDB data persistence
- Mongoose object-document mapping
- React component-based architecture
- Frontend routing and HTTP requests
- Environment-based configuration
- Cross-origin resource sharing (CORS)
- Cloud deployment and production configuration
- Authentication and password security concepts

## Future Enhancements

Potential areas for further development include:

- Stronger authentication and session management
- Improved connection recovery and error handling
- Automated unit and integration tests
- Logging, monitoring, and application health checks
- Load testing and performance optimization
- Improved meeting accessibility and responsive layouts
- Scalable real-time communication infrastructure

These are possible improvements, not claims about existing functionality.

## Developer

**Mohammed Zeeshan**

GitHub: [@Zeeshan-X11](https://github.com/Zeeshan-X11)

**Project:** [Spark-Modern-Meeting-Experience](https://github.com/Zeeshan-X11/Spark-Modern-Meeting-Experience)

**Live Demo:** [SparkMeet](https://sparkmeet-web.onrender.com/home)

---

*Built as a full-stack web development project to explore real-time communication, backend integration, database connectivity, and cloud deployment.*

