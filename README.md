# Operating System Project

## Shared-Note-Editor

This is a web application for sharing & editing notes with your friends. The text editor is built using the MERN stack with tailwind CSS. Authentication using bcrypt and authorization using tokens.

### Main Features:

The project includes the following features:

+ Create a new note
+ Share a note with your friends and give them read/write access 
+ Collaborate with your friends and edit notes together
+ Remove read/write access from the shared users
+ You can see live updation in notes
# Setup
+ Run npm install to install the dependencies
+ Run npm run start to start a local server
+ Launch the app at the default address http://localhost:3000/signup



# Architecture

1. *Frontend Interface*:
   - The provided React file (index.html) serves as the frontend interface.
   - It includes features for text editing, such as input fields and buttons for saving and sharing notes.
   - JavaScript code handles user interactions and real-time updates.

2. *Backend Server*:
   - *Web Server*: Hosts the backend application, handles HTTP requests from clients, and serves the frontend files.
   - *Server-Side Logic*: Written in a backend language like Node.js. This logic manages user sessions, authentication, and collaboration features.
   - *Real-Time Communication*: Utilizes WebSockets or similar technology to facilitate real-time updates between clients and the server.

3. *Multi-Threading and Synchronization*:
   - *Thread Pool*: Utilized to handle incoming requests concurrently, allowing the server to handle multiple clients simultaneously.
   - *Shared Memory*: Data structures such as queues or buffers are shared among threads to store and process incoming requests and their corresponding responses.
   - *Synchronization Mechanisms*: Mutexes, semaphores, or other synchronization primitives are employed to coordinate access to shared resources and ensure thread safety.
   - *Collaboration Engine*: Responsible for managing concurrent editing of shared notes. It synchronizes changes made by multiple users and ensures consistency across all connected clients.

4. *Data Storage*:
   - *In-Memory Data Store*: Utilized for storing shared notes and their metadata. This could be implemented using data structures like arrays, maps, or linked lists.
   - *Persistent Storage (Optional)*: If required, shared notes can be persisted to disk using a database or file system for durability.

5. *Networking*:
   - *HTTP API*: Defines endpoints for client-server communication, including authentication, CRUD operations for notes, and real-time collaboration.
   - *WebSocket Protocol*: Enables bidirectional communication between clients and the server, allowing for real-time updates to shared notes.

6. *Security*:
   - *Authentication and Authorization*: Ensures that only authenticated users can access the shared editing feature and that they have appropriate permissions.
   - *Input Validation*: Validates user inputs to prevent injection attacks and ensure data integrity.

7. *Error Handling and Logging*:
   - *Error Handling*: Proper error handling mechanisms are implemented to gracefully handle exceptions and errors.
   - *Logging*: Records system events, errors, and user activities for debugging and auditing purposes.

8. *Deployment*:
   - The system can be deployed on a local server (localhost) for development and testing purposes.
   - For production deployment, it can be hosted on cloud platforms like AWS, Azure, or Google Cloud Platform.
