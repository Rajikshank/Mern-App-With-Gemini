# 🚀 MERN Todo App with Google Gemini ✨

A Simple MERN Stack Todo Application with Google Gemini's Text Generation for Subtasks.I have built this project as a task given for the Full Stack Trainee position at [Qtechy](https://qtechy.com.au/).

This guide will help you set up and run the MERN stack application, which includes a MongoDB database, Express.js server, React.js frontend, and Node.js runtime.

## Demo

https://github.com/user-attachments/assets/a8497407-c4d4-468c-b218-e693c7925ba3

## Prerequisites 📋

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (includes npm) 🌐
- [MongoDB](https://www.mongodb.com/try/download/community) (if running locally) 🗄️
- [GOOGLE GEMINI API KEY](https://ai.google.dev/aistudio) (I already provided one with the submission email) 🗝️
- MONGOOSE DB URI (I already provided one with the submission email ) 🔗

## Features 🌟

### Frontend 💻

- 🔑 **User Authentication**
  - User Registration and Login
  - Password Reset Functionality
- 📋 **Todo Management**
  - Add, Edit, and Delete Todos
  - Generate Subtasks using Google Gemini Pro ✨
- 🎮 **Gamification**

  - Track Completed Todos and Subtasks
  - Display Completion Percentages

- 👤 **User Account Management**
  - Edit and Delete Account

### Backend 🔧

- 🔐 **Security**
  - JWT Authentication
  - Password Hashing using bcrypt
- 🛡️ **Validation**
  - Data Validation using express-validator
- 📊 **Database**

  - MongoDB Integration for Storing User and Todo Data

- 🔄 **API Integration**
  - Google Gemini API for Subtask Generation

## Technologies Used 🛠️

This project was built using the following technologies:

- 🌐 **MongoDB**: For database management
- ⚙️ **Express.js**: For the backend server
- ⚛️ **React**: For the frontend UI
- 🟢 **Node.js**: For the backend runtime environment
- ✨ **Google Gemini Pro**: For generating subtasks
- 🎨 **Tailwind CSS**: For styling the application

## Project Setup 🛠️

Follow these steps to set up and run the application:

### 1. Clone the Repository 📂

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies 📦

#### Frontend

Navigate to the frontend directory and install the necessary dependencies:

```bash
cd todo
npm install
```

#### Backend

Navigate to the backend directory and install the necessary dependencies:

```bash
cd ../todo-backend
npm install
```

### 3. Configure Environment Variables 🌍

#### Backend

Create a `.env` file in the `todo-backend` directory and add your MongoDB URI:

```bash
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

#### Frontend

Create a `.env` file in the `todo` directory and add your Google Gemini API key:

```bash
REACT_APP_GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Start the Backend Server 🚀

In the backend directory, start the server using nodemon:

```bash
cd ../todo-backend
nodemon server.js
```

### 5. Start the Frontend Application 🌐

In the frontend directory, start the application:

```bash
cd ../todo
npm start
```

## Usage 📝

Once the application is running, you can:

- Sign up for a new account ✍️
- Log in to your account 🔑
- Reset your password 🔄
- Create, edit, and delete todos 🗒️
- Generate subtasks using Google Gemini Pro ✨
- Track your progress with gamification features 🎮

## Contributing 🤝

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License 📜

This project is licensed under the MIT License.
