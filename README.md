# Review System

## Overview
This is my review system. It is a full-stack application made in the **MERN Stack**. MERN stands for MongoDB, Express JS, React JS, and Node.js. It is an extremely popular tech stack mainly used for startups.
My web application is similar to **Google Reviews**, which is also a reviewing site for businesses. Reviews can affect businesses a lot, since many consumers first check reviews before buying from them. 
That's why this project has many real-world applications.

![MERN Stack](https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=3840&fit=max)<br />

Also, this application teaches a lot about how the **frontend and backend work together**, useful for both **pen testing and development**. When you are pen testing a website, you *need* to know how the website is made and connected all together. However, **hacking into any of the production websites is strictly prohibited and is not legal since I am not giving permission for anything hacking-related**. If you do want to **ethically hack** into a vulnerable web app, consider using **OWASP Juice Shop**, **DVWA**, or recreate my web app with **your own database**.

## URLs
URLs for all my pages:
- [User Page](https://review-system-naksh-rathore.netlify.app)
- [Admin Page](https://review-system-admin-naksh-rathore.netlify.app)

## How to use

**Step 1 (Clone repository)**: `git clone https://github.com/Naksh-Rathore/review-system`<br />

### Backend Setup
**Step 2 (Enter backend folder)**: `cd backend`<br /> 
**Step 3: Add a .env file storing your MongoDB URI, port, and hashed admin password**.<br /> 
```env
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
PORT=3000
HASHED_ADMIN_PASSWORD="$2y$10$1Ywd9u.BoWG3bkZQ9L2Fnuc7LdURw4RuNFPtwyt6LZqNEZ3EvyQVm" # 123
```

**Step 4 (Add dependencies)**: `npm install`<br />
**Step 5 (run server.js)**: `node server.js` or for Nodemon run `npm run dev`<br />
**Step 6**: Test with Postman, Insomnia, or more!<br />

### Frontend Setup
**Step 2 (Enter frontend folder)**: `cd frontend`<br /> 
**Step 3 (Add dependencies)**: `npm install`<br />
**Step 4 (Create server)**: `npm run dev`<br />
**Step 5**: Playtest the frontend, modify it, and more!

## Tips
- Make sure MongoDB is running and accessible.
- Both the frontend and backend should be running simultaneously for the app to work fully if you are running it locally. 
- Feel free to fork the repository and contribute!
