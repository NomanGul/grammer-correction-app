# Grammar Correction App

A full-stack JavaScript application that provides real-time grammar correction using OpenAI's API.

## Features

- User Authentication (Login/Logout)
- Real-time Grammar Checking

## Tech Stack

### Backend
- Express.js
- Firebase Admin (Authentication)
- OpenAI API

### Frontend
- React
- CSS for styling

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API Key
- Firebase Admin credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NomanGul/grammer-correction-app.git
cd grammer-correction-app
```

2. Install dependencies for both backend and frontend:
```bash
npm run install-all
```

## Configuration

Create a `.env` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
PORT=5001
```

Create a `.env` file in the client directory with the following variables:
```
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:5001
```

## Running the Application

### Development Mode
To run both frontend and backend in development mode:
```bash
npm run dev
```

The backend server will run on `http://localhost:5001` and the frontend development server will run on `http://localhost:5173`.

## API Endpoints

- `POST /api/grammar/check` - Grammar checking endpoint
