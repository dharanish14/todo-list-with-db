# 🚀 TaskFlow Pro - Modern To-Do Web Application

> Built with Node.js, Express, React, Vite, MongoDB Atlas integration, and Docker containerization.

TaskFlow Pro is a full-stack task & productivity management application. It features a modern **Glassmorphic UI**, vibrant animations, dark/light theme switching, priority levels, subtask checklists, productivity statistics dashboard, category filters, and full **Docker containerization**.

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), Lucide Icons, Modern Glassmorphism CSS, Responsive Design
- **Backend**: Node.js, Express.js REST API, Mongoose ODM
- **Database**: MongoDB Atlas (Cloud) with fallback support for local Dockerized MongoDB
- **Containers**: Docker & Docker Compose (`docker-compose.yml`)

---

## 🐳 Quick Start with Docker (Recommended)

Run the entire application stack (Frontend + Backend REST API + Database) in containers with a single command:

```bash
docker-compose up --build
```

Access the services:
- **Web Application**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:5000/api`
- **API Health Check**: `http://localhost:5000/api/health`

To stop the containers:
```bash
docker-compose down
```

---

## 🍃 MongoDB Atlas Configuration

By default, the application uses an isolated local MongoDB container. To connect to your **MongoDB Atlas Cloud Cluster**:

1. Open `.env` (or copy `.env.example` to `.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/todo_db?retryWrites=true&w=majority
   ```
2. Replace `<USERNAME>` and `<PASSWORD>` with your Atlas database user credentials.
3. Ensure your IP address is whitelisted in MongoDB Atlas under **Network Access**.
4. Restart your Docker containers:
   ```bash
   docker-compose up --build
   ```
   The backend logs will confirm:
   `[Database] Attempting connection to MongoDB Atlas Cluster...`
   `[Database] MongoDB Connected Successfully!`

---

## 💻 Local Development (Without Docker)

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
Running at `http://localhost:5000`

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Running at `http://localhost:3000`

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/todos` | Get all tasks (supports `search`, `category`, `priority`, `completed`, `sortBy`) |
| `GET` | `/api/todos/:id` | Get single task details |
| `POST` | `/api/todos` | Create a new task |
| `PUT` | `/api/todos/:id` | Update task details or subtasks |
| `PATCH` | `/api/todos/:id/toggle` | Quick toggle task completion |
| `DELETE` | `/api/todos/:id` | Delete task |
| `GET` | `/api/todos/stats` | Retrieve productivity stats & completion rate |
| `GET` | `/api/health` | Backend status check |
