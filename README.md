StudyHub 🚀 - Your Collaborative Learning Platform


StudyHub is a modern, full-stack web application designed to empower students by providing a seamless platform for collaborative learning, resource sharing, and real-time interaction.

Whether you need to organize study sessions, share notes, manage tasks, or connect face-to-face with peers, StudyHub brings all the essential tools together in one intuitive interface.

Live Demo: Visit StudyHub Live! https://study-hub-frontend-ebon.vercel.app/

✨ Features

StudyHub offers a rich set of features to enhance the learning experience:
👤 Authentication: Secure user registration and login with JWT. Password reset via email.
🤝 Collaborative Rooms: Create and join study rooms for focused group work.
📅 Event Scheduling: Integrated calendar to schedule study sessions, deadlines, and events within rooms.
📝 Notes & Comments: Rich-text note-taking with commenting features for feedback.
✅ Task Management: Assign and track tasks within study rooms.
📹 Real-Time Video Chat: Integrated WebRTC video conferencing for face-to-face collaboration.
💡 Interactive Whiteboard: Real-time whiteboard for brainstorming and visual explanations.
📚 Resource Sharing: Upload and share study materials (notes, links, videos) within rooms.
💬 Community Forum: A space for broader discussions, questions, and announcements (if implemented).
📧 Contact Form: Allow users to send messages directly to the admin/support.
🔍 Search: Functionality to search across notes, resources, or users.
🖼️ Profile Management: Update user profiles and avatars.
⚙️ Background Jobs: Automated tasks like reminders or cleanup (e.g., invitation cleanup).

🛠️ Tech Stack

This project leverages modern web technologies:

Frontend:
React (with Vite)
Tailwind CSS
Framer Motion (for animations)
Lucide Icons
Socket.IO Client
Axios

Backend (API):
Node.js
Express.js
MongoDB (with Mongoose)
JWT (JSON Web Tokens) for authentication
Nodemailer (for emails like password reset, contact form)
Multer (for file uploads)

Signaling Server (WebRTC):
Node.js
Socket.IO
Express.js
Database:
MongoDB Atlas

Deployment:
Frontend: Vercel
Backend (API): Vercel
Signaling Server: Render

Domain: Name.com (or your provider)

📁 Project Structure

The repository is organized into three main parts:

/
├── backend/          # Node.js/Express API Server (handles data, auth, business logic)
├── frontend/         # React/Vite Client Application (the user interface)
└── signaling-server/ # Node.js/Socket.IO Server (manages WebRTC signaling for video chat)


🚀 Getting Started Locally

To run StudyHub on your local machine, follow these steps:
1. Clone the Repository:
git clone <your-repository-url>
cd <repository-folder>

2. Setup Backend:
cd backend
npm install

# Create a .env file in the backend/ directory and add the necessary variables (see below)
npm run dev # Starts the backend server (usually on port 5001)


3. Setup Signaling Server:
cd ../signaling-server
npm install

# Create a .env file in the signaling-server/ directory (see below)
npm start # Starts the signaling server (usually on port 3001 or 8000)


4. Setup Frontend:
cd ../frontend
npm install

# Create a .env file in the frontend/ directory (see below)
npm run dev # Starts the frontend development server (usually on port 5173)


5. Access the Application:
Open your browser and navigate to http://localhost:5173.

⚙️ Environment Variables
You need to create .env files in each of the backend, frontend, and signaling-server directories. Do not commit these files to Git.

backend/.env:
MONGO_URI=<your_mongodb_atlas_connection_string>
PORT=5001
JWT_SECRET_KEY=<your_strong_jwt_secret>
CLIENT_URL=http://localhost:5173 # Frontend URL for CORS and emails

# Email (e.g., Gmail - use an App Password for SMTP_PASS)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false # Set to true if using port 465
SMTP_USER=<your_gmail_address>
SMTP_PASS=<your_gmail_app_password>
EMAIL_FROM="StudyHub <your_gmail_address>"
CONTACT_EMAIL=<email_address_to_receive_contact_form_submissions>


signaling-server/.env:
PORT=8000 # Or the port your signaling server uses
CORS_ORIGIN=http://localhost:5173 # Frontend URL for CORS
# Optional: If you integrated backend calls for auth
# BACKEND_URL=http://localhost:5001/api


frontend/.env:
# URL for your backend API server
VITE_API_URL=http://localhost:5001/api
# URL for your signaling server
VITE_SOCKET_URL=http://localhost:8000 # Match the signaling server port


Note: For production deployment, replace localhost URLs with your deployed Vercel and Render URLs.

☁️ Deployment
The Frontend and Backend API are deployed on Vercel. Vercel handles CI/CD from the connected GitHub repository. Remember to set the environment variables in the Vercel project settings. The backend requires a vercel.json file for proper routing and CORS headers.
The Signaling Server requires a persistent connection (WebSocket) and is deployed on Render as a Web Service. Remember to set environment variables in Render.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

👤 Author
Mohammad Alim 

GitHub: @alim034  (https://github.com/alim034)
LinkedIn: Your LinkedIn Profile https://www.linkedin.com/in/mohammad-alim-7a8a52289/
📜 License
This project is licensed under the MIT License. 
