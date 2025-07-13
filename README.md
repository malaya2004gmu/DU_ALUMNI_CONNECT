#  DUAlumniConnect 🎓

A full-stack MERN-based portal to connect DU alumni with students. Features include job posting, profile management, secure chat, and event updates.
## Features
Dynamic role-based authentication

Real-time chat with OpenPGP encryption

Admin dashboard for events/jobs/Course/Alumni management

Alumni dashboard where he can managae his posted jobs, post on community ,chat with others, personal profile manage etc.

same for student also but student have some restriction on some functuinality .

Responsive UI with TailwindCSS



## Technologies used 
1.Frontend-React,style-Tailwindcss

2.Backend-Node.js,Express

3.Database-MongoDB (Mongoose)

4.Authentication:JWT

5.Security for chat page-OpenPGP

## Installation & Setup


### follow these steps to correctly setup
open vs code and clone the repository or direct download from github
### clone the repo
1. git clone https://github.com/malaya2004gmu/DU_ALUMNI_CONNECT.git
### backend setup
2. cd backend

3. npm install

4. npm start/npm run dev
### frontend setup
5. cd frontend

6. npm install

7. npm start

### .env Configuration
PORT=5000

MONGO_URI=your_db_uri

ACCESS_TOKEN_SECRET=your_jwt_secret

REFRESH_TOKEN_SECRET=your_jwt_refresh_token

NODE_ENV=production

MAIL_USER=your_gmail(any want to use which has two step verification password )

MAIL_PASS=your_created_pass (create a 16 digit mail pass key from google and paste that here)

