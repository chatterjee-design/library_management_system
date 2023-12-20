# READSPHERE Library Management System - Server

This is the backend codebase for the READSPHERE Library Management System.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm: [https://www.npmjs.com/](https://www.npmjs.com/)

### Installation

**Clone the repository**:

   ```bash
   git clone https://github.com/chatterjee-design/library_management_system.git

   ```

<<<<<<< HEAD
**Navigate to the server directory**:

    cd library_management_system/server

**Install dependencies**:

    npm install
=======
Navigate to the server directory:

     cd library_management_system/server

Install dependencies:

     npm install
>>>>>>> 6413b8269714332f250784379f945bd24aa924f6

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

**Running the Server**


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


# READSPHERE Library Management System - Client side

## Overview

This is the frontend codebase for the Library Management System project. The Library Management System is a web application built to manage books, user accounts, and orders in a library setting.

## Project Structure

The project is organized into slices, each handling a specific functionality which connect server side code to the client side code. Key slices include:

- **Auth Slice**: Manages user authentication and related actions.
- **Cart Slice**: Handles shopping cart operations such as adding, removing, and fetching cart items.
- **Contact Slice**: Manages contact form submissions.
- **Library Slice**: Manages book-related actions, including fetching, creating, updating, and deleting books.
- **Order Slice**: Deals with order-related actions, such as placing orders, retrieving orders, and handling returns.
- **Stat Slice**: Provides statistics about the application, including the total number of users, books, orders, and more.

## Getting Started

**Navigate to the client directory**:

   cd client-lms

**Install dependencies**:

    npm install

**Running the Server**

Run the following command to start the server in development mode:

    npm run dev

## Dependencies

- **@fortawesome/fontawesome-svg-core**: Icon library for SVG icons.
- **@fortawesome/free-brands-svg-icons**: Collection of brand logos in SVG format.
- **@fortawesome/free-regular-svg-icons**: Collection of regular style icons in SVG format.
- **@fortawesome/free-solid-svg-icons**: Collection of solid style icons in SVG format.
- **@fortawesome/react-fontawesome**: React component for FontAwesome icons.
- **@reduxjs/toolkit**: Toolkit for efficient Redux development.
- **@tailwindcss/line-clamp**: Tailwind CSS plugin for truncating multi-line text.
- **axios**: HTTP client for making requests to the backend.
- **chart.js**: Simple yet flexible JavaScript charting library.
- **daisyui**: Tailwind CSS component library.
- **lodash**: Utility library for working with arrays, objects, and more.
- **react**: JavaScript library for building user interfaces.
- **react-chartjs-2**: React wrapper for Chart.js.
- **react-dom**: React package for working with the DOM.
- **react-hot-toast**: Toast notifications for React applications.
- **react-icons**: Library with popular icon sets as React components.
- **react-redux**: Official React bindings for Redux.
- **react-router-dom**: Declarative routing for React.js.
- **recharts**: Redefined chart library built with React and D3.

## Dev Dependencies

- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: Linting tool for identifying and reporting on patterns in JavaScript.
- **eslint-plugin-react**: React specific linting rules for ESLint.
- **eslint-plugin-react-hooks**: ESLint rules for React Hooks.
- **eslint-plugin-react-refresh**: ESLint plugin for React Fast Refresh.
- **eslint-plugin-simple-import-sort**: ESLint plugin for enforcing a consistent import order.
- **postcss**: Tool for transforming styles with JavaScript plugins.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom designs.
- **vite**: Fast development server and modern build tool for React.



### Available Scripts

- **npm run dev**: Start the development server.
- **npm run build**: Build the production-ready application.
- **npm run lint**: Run ESLint for code linting.
- **npm run preview**: Preview the production build.

### Contributing

If you'd like to contribute to the project, please follow the standard GitHub flow:

- Fork the repository.
- Create a new branch: git checkout -b feature/my-feature.
- Make your changes and commit them: git commit -m 'Add my feature'.
- Push to the branch: git push origin feature/my-feature.
- Open a pull request.

### License

This project is licensed under the ISC License - see the LICENSE.md file for details.
