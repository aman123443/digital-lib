# Librify - A Full-Stack Digital Library

[![Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-brightgreen?style=for-the-badge&logo=vercel)](https://digital-lib-ut2y.vercel.app)

Librify is a modern, full-stack web application designed for book lovers. It serves as a personal library, a powerful book discovery tool using the Google Books API, and an intelligent recommendation engine powered by the Gemini API. The entire application is built with a secure, containerized Spring Boot backend and a responsive React frontend, deployed to a live cloud environment.

## ✨ Key Features & Screenshots

*(**Action:** Take screenshots of your live application and replace the placeholder links below. You can upload images directly to your GitHub repository and get a link.)*

| Reading Library | Book Search | AI Recommendations |
| :---: | :---: | :---: |
| ![Reading Library](https://via.placeholder.com/300x200.png?text=Yo<img width="1872" height="902" alt="Screenshot 2025-11-08 233717" src="https://github.com/user-attachments/assets/3fbcde78-7f3b-489f-8fa3-a61da4229d0f" />
ur+Library+Page) | ![Book Search](https://via.placeholder.com/300x200<img width="1895" height="900" alt="Screenshot 2025-11-08 233855" src="https://github.com/user-attachments/assets/a686221b-254d-4589-8cb7-a465fb7c0e21" />
.png?text=Book+Store+Search) | ![AI Recommendations](https://via.placeholder.com/300<img width="1904" height="905" alt="Screenshot 2025-11-08 234027" src="https://github.com/user-attachments/assets/1b244ecf-38cf-4dad-aaee-bb59bfbe6141" />
x200.png?text=AI+Chatbot) |

* **Secure User Authentication:** Full registration and login functionality using a secure JWT-based system.
* **Personal Digital Library:** Registered users can manage a personal collection of books they have saved.
* **Book Discovery:** Search for any book in the world using a direct integration with the Google Books API.
* **Add to Library:** Users can add books found via search to their personal library. *(Note: This feature was designed but then reverted per your request. You can re-add it or remove this line.)*
* **AI-Powered Recommendations:** A chatbot interface powered by the Google Gemini API provides intelligent and personalized book suggestions based on user prompts.
* **Responsive Design:** The user interface, built with React and Material-UI, is fully responsive and provides a seamless experience on desktop and mobile devices.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, React Router, Material-UI (MUI), Axios |
| **Backend** | Java, Spring Boot, Spring Security (JWT), Spring Data JPA, Maven |
| **Database** | PostgreSQL |
| **APIs** | Google Books API, Google Gemini API, REST APIs |
| **Deployment** | Docker, Render (Backend), Vercel (Frontend) |

## 🚀 Running Locally

To run this project on your local machine, please follow the steps below.

### Prerequisites
* Java JDK 17 or later
* Apache Maven
* Node.js and npm
* A local PostgreSQL instance

### Backend Setup (Spring Boot)
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/aman123443/digital-lib.git](https://github.com/aman123443/digital-lib.git)
    cd digital-lib/bookstore
    ```
2.  **Configure the database:**
    Open `src/main/resources/application.properties` and set up your local PostgreSQL connection:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_local_db_name
    spring.datasource.username=your_postgres_user
    spring.datasource.password=your_postgres_password
    spring.jpa.hibernate.ddl-auto=update
    ```
3.  **Set Environment Variables:**
    You will need to set `JWT_SECRET`, `JWT_EXPIRATION`, and `GEMINI_API_KEY` as environment variables in your IDE (IntelliJ) for the backend to run.
4.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### Frontend Setup (React)
1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend 
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up the environment file:**
    Create a new file named `.env` in the `frontend` directory and add the following line:
    ```
    REACT_APP_API_URL=http://localhost:8080
    ```
4.  **Run the application:**
    ```bash
    npm start
    ```
    The frontend will start on `http://localhost:3000` (or another port if 3000 is busy).

## ⚙️ Environment Variables

This project requires the following environment variables to be set on the deployment platforms (Render and Vercel).

#### Backend (Render)
* `DB_HOST`: The hostname of the PostgreSQL database.
* `DB_PORT`: The port for the database (e.g., `5432`).
* `DB_NAME`: The name of the database.
* `DB_USER`: The username for the database.
* `DB_PASS`: The password for the database.
* `JWT_SECRET`: A long, secure, random string for signing JWTs.
* `JWT_EXPIRATION`: Token expiration time in milliseconds (e.g., `3600000`).
* `GEMINI_API_KEY`: Your API key for the Google Gemini API.

#### Frontend (Vercel)
* `REACT_APP_API_URL`: The full URL of the live deployed backend (e.g., `https://digital-lib-xbze.onrender.com`).

## 👤 Author

**Aman**
* **GitHub:** [@aman123443](https://github.com/aman123443)
* **LinkedIn:** *(https://www.linkedin.com/in/aman-shaikh-0ba36a244)*
