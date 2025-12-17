# Full-Stack To-Do List Application

A full-stack To-Do List application built with **Node.js**, **Angular**, and **MongoDB**.  
This application allows users to **create, read, update, and delete tasks**, with additional features like **task prioritization, due dates, and sorting**.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment on Google Cloud Platform (GCP)](#Deployment-on-Google-Cloud-Platform (GCP))


## Features

The Full-Stack To-Do List Application provides a comprehensive task management system with the following features:

1. Add, Edit, and Delete Tasks:

Users can create new tasks with a title, description, priority, and due date.

Existing tasks can be updated or deleted with a simple click.

2. Track Task Completion:

Mark tasks as completed.

Completed tasks are visually differentiated from pending tasks.

3. Task Prioritization:

Assign priorities to tasks: High, Medium, or Low.

Priority helps users focus on the most important tasks first.

4. Set Task Due Dates:

Assign due dates to tasks to plan deadlines.

Overdue tasks are highlighted automatically.

5. Sort Tasks:

Tasks can be sorted by due date, priority, or creation time.

Sorting helps users manage tasks efficiently.

6. Highlight Overdue Tasks:

Tasks past their due date are clearly marked to catch attention.

7. Responsive UI Using Angular:

The frontend is built with Angular, providing a clean, user-friendly interface.

Fully responsive design ensures usability on desktops, tablets, and mobile devices.


## Tech Stack

- **Frontend:** Angular, TypeScript, Bootstrap / CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)


## Setup Instructions

### Prerequisites

- Node.js >= 18.x
- Angular CLI >= 16.x
- npm or yarn
- MongoDB (Atlas or local instance)

### Backend Setup

1. Navigate to backend folder:
cd todo-app-backend

2. Install dependencies:
   npm install
   
3. Create a .env file with the following variables:
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   
4. Start the backend server:
   npm run dev
The backend API will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend folder:
   cd todo-app-frontend

2. Install dependencies:
   npm install
   
3. Start the Angular development server:
   ng serve
The frontend will run on http://localhost:4200.

## Running the Application

Access the frontend at http://localhost:4200 and backend at http://localhost:3000

## API Endpoints

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/tasks`            | Get all tasks          |
| GET    | `/api/tasks/:id`        | Get task by ID         |
| POST   | `/api/tasks`            | Create a new task      |
| PUT    | `/api/tasks/:id`        | Update task by ID      |
| DELETE | `/api/tasks/:id`        | Delete task by ID      |

## Project Structure

todo-app/
├─ todo-app-backend/
│  ├─ server.js
│  ├─ routes/
│  ├─ models/
│  ├─ dto/
│  └─ middleware/
├─ todo-app-frontend/
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ services/
│  │  │  ├─ components/
│  │  │  └─ models/
│  │  └─ assets/
├─ README.md

## Screenshots

<img width="1918" height="1022" alt="image" src="https://github.com/user-attachments/assets/db1159a9-2f21-4c3d-913c-4aa21aa432e4" />

## Deployment on Google Cloud Platform (GCP)

1. Backend (Node.js API)

Containerize the backend with your Dockerfile.

Push the Docker image to Google Container Registry:

gcloud auth configure-docker
gcloud builds submit --tag gcr.io/<PROJECT_ID>/todo-backend


Deploy to Cloud Run:

gcloud run deploy todo-backend \
  --image gcr.io/<PROJECT_ID>/todo-backend \
  --platform managed \
  --region <YOUR_REGION> \
  --allow-unauthenticated


Set environment variables (like MONGO_URI) in Cloud Run.

Cloud Run provides a public HTTPS URL for your API.

2. Frontend (Angular app)

Build your Angular app:

ng build --prod


Create a GCP Storage bucket for static hosting:

gsutil mb gs://<YOUR_BUCKET_NAME>


Upload the Angular build files:

gsutil cp -r dist/todo-app-frontend/* gs://<YOUR_BUCKET_NAME>


Enable static website hosting:

gsutil web set -m index.html gs://<YOUR_BUCKET_NAME>


Optional: Enable Cloud CDN for faster delivery.

3. Connect Frontend to Backend

In Angular service, set the API URL to your Cloud Run backend:

for example:: private apiUrl = 'https://todo-backend-xyz.a.run.app/api/tasks';

