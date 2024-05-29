Description:
MyApp is a Node.js application that connects to a MongoDB database using Mongoose. It provides APIs for user registration and login using Passport JWT authentication. Authenticated users can create, read, update, and delete posts. Each post includes details such as title, body, creation information, active/inactive status, and geolocation. The application also includes an endpoint to search posts by latitude and longitude, and a dashboard to count active and inactive posts.

Features:
User registration and login with JWT authentication
CRUD operations for posts
Geolocation-based post search
Dashboard with counts of active and inactive posts

Technologies Used:
Node.js
Express
MongoDB
Mongoose
Passport JWT
bcryptjs
jsonwebtoken
body-parser
