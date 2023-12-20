# READSPHERE Library Management System - Server

This is the backend codebase for the READSPHERE Library Management System.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm: [https://www.npmjs.com/](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chatterjee-design/library_management_system.git

   ```

2. Navigate to the server directory:

   cd library_management_system/server

3. Install dependencies:

   npm install

###    Create a `.env` file in the root of the server directory and set the necessary environment variables. You can use the `.env.example` file as a template.

    PORT=3001
    MONGODB_URI=your_mongodb_connection_string
    SECRET_KEY=your_jwt_secret
    SMTP_USERNAME=your_smtp_username
    SMTP_PASSWORD=your_smtp_password
    CLOUD_NAME=your_cloudinary_cloud_name
    API_KEY=your_api_key
    API_SECRET=your_api_secret
    CONTACT_US_EMAIL=your_email_address

###    Running the Server


Run the following command to start the server in development mode:

    npm run dev

The server will be running at [http://localhost:3001]


###    Project Structure


- controllers/: Contains the route controllers handling different endpoints.
- models/: Defines the MongoDB schema and models.
- routes/: Defines the API routes.
- uploads/: Temporary storage for file uploads.
- utils/: Utility functions.
- server.js: Entry point for the server.

## Technologies Used

- Node.js
- Express.js
- MongoDB (mongoose)
- JWT for authentication
- Cloudinary for cloud-based image storage
- Nodemailer for sending emails
- bcrypt for password hashing
- Multer for handling file uploads
- dotenv for environment variable management
- Cors for handling Cross-Origin Resource Sharing
- Nodemon for development server auto-reloading

### Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

### License

This project is licensed under the ISC License - see the LICENSE.md file for details.