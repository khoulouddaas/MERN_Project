# 🚀 DevsOnDeck

DevsOnDeck is a full-stack MERN web application designed to simplify the connection between developers looking for opportunities and organizations looking for developers with specific technical skills.

Instead of simply displaying a list of developers, DevsOnDeck uses a skill-based matching system. Developers create their profiles and select their main technical skills, while organizations publish job positions and specify the technologies required for each position.

The application then compares both sets of skills and displays developers whose profiles match the requirements of the selected position.

---

## 💡 About the Project

Finding the right developer for a technical position can require manually reviewing many profiles. DevsOnDeck was created to make this process more structured by using developers' technical skills as the main matching criteria.

The platform supports two types of users:

### 👨‍💻 Developers

Developers can:

- Create an account using email/password or Google Sign-In
- Complete their personal profile
- Select their top 5 technical skills
- Add a short biography
- Log in and manage their profile
- Receive email notifications when a relevant opportunity becomes available
- View the location of an associated organization on a map

### 🏢 Organizations

Organizations can:

- Create and manage an organization account
- Log in to their organization dashboard
- Create new job positions
- Add a title and description to each position
- Select up to 5 required technical skills
- View their available positions
- Select a position and see developers whose skills match its requirements

---

## 🎯 Skill-Based Matching System

The matching system is one of the main features of DevsOnDeck.

Each developer selects up to **5 technical skills** when completing their profile. Organizations also select up to **5 required skills** when creating a job position.

When an organization selects a position, the application compares the skills required by that position with the skills stored in developer profiles.

For example:

Position requirements:

JavaScript • React • Node.js • MongoDB • Express.js

Developer skills:

JavaScript • React • Node.js • Python • Java

Matching skills:

JavaScript • React • Node.js → **3 matching skills**

The developer can therefore be considered a potential candidate and displayed in the organization's list of available developers.

This allows organizations to focus on developers whose technical profiles are relevant to their positions.

---

## 📧 Automatic Opportunity Notifications

DevsOnDeck also includes an automatic email notification system.

When an organization publishes a position and the application identifies a developer whose skills match the requirements, the developer can receive an email informing them about the new opportunity.

Email notifications are implemented using **Nodemailer**.

---

## 🔐 Authentication

The application provides authentication for both developers and organizations.

Users can authenticate using:

- Email and password
- Google Sign-In / Google OAuth

The application also includes form validation and authentication error handling to prevent invalid or incomplete information from being submitted.

---

## 🗺️ Location Integration

The developer profile includes a map displaying the location of the organization associated with an opportunity.

A map component and location marker are used to provide a visual representation of the organization's location.

---

## ✨ Main Features

- 👨‍💻 Separate Developer and Organization accounts
- 🔐 Email/password authentication
- 🔑 Google Sign-In
- 📝 Developer profile management
- 🧠 Selection of developer technical skills
- 🏢 Organization dashboard
- 💼 Job position creation
- 🎯 Skill-based developer matching
- 🔎 Developer filtering based on job requirements
- 📧 Automatic opportunity email notifications
- 🗺️ Organization location map
- ✅ Form validation and error handling

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- React Components
- React Hooks (`useState`, `useEffect`)
- React Router
- Axios / Fetch
- CSS

### Backend
- **Node.js**
- **Express.js**
- REST API
- Middleware
- Authentication logic

### Database
- **MongoDB Atlas**
- **Mongoose**

The database is organized around the main entities of the application:

- `developers`
- `organizations`
- `positions`
- `skills`

### Additional Technologies
- **Google OAuth** – Google authentication
- **Nodemailer** – Automatic email notifications
- **Git** – Version control
- **GitHub** – Source code hosting

---

## ⚙️ Application Architecture

DevsOnDeck follows the MERN architecture:

React Frontend
      ↓
HTTP Requests
      ↓
Node.js + Express REST API
      ↓
Mongoose
      ↓
MongoDB Atlas

The frontend is responsible for the user interface and user interactions, while the backend handles authentication, business logic, matching, and communication with the database.

---

## 🔄 How DevsOnDeck Works

### Developer Flow

1. The developer creates an account.
2. The developer completes their profile.
3. They select their top 5 technical skills.
4. Their information and skills are stored in MongoDB.
5. Their profile becomes available for skill matching.
6. When a relevant opportunity is detected, they can receive an email notification.

### Organization Flow

1. The organization creates an account.
2. It logs into the organization dashboard.
3. The organization creates a new position.
4. It specifies the position name, description, and required skills.
5. DevsOnDeck compares these requirements with developer profiles.
6. Matching developers are displayed in the **Available Devs** section.

---

## 📸 Application Preview

### 🏠 Home Page

The home page is the main entry point of DevsOnDeck. Users can choose whether they want to join the platform as a developer or register as an organization.

<img width="3836" height="1932" alt="home" src="https://github.com/user-attachments/assets/121d07c5-9ec9-4fd2-b28b-591eff6f2f3c" />

---

### 👨‍💻 Developer Registration

Developers can create an account by providing their personal information. The application also performs form validation to prevent incomplete or invalid registrations.

<img width="3835" height="1925" alt="dev-register" src="https://github.com/user-attachments/assets/6710ed83-c9f6-43bf-952e-374e62d665cf" />

---

### 🧠 Developer Skills

After registration, developers select their top 5 technical skills and can provide a short bio.

These skills are later used by the matching system to identify relevant job opportunities.

<img width="3819" height="1828" alt="add skills" src="https://github.com/user-attachments/assets/508c9c37-d357-4895-903d-2cb269097fad" />

---

### 👤 Developer Profile

The developer profile displays account information and technical skills.

It also includes a map that can display the location of the organization associated with an opportunity.

<img width="3835" height="1839" alt="profile dev" src="https://github.com/user-attachments/assets/c43cead2-8b54-48ff-89f8-a7ff4bcd8309" />

---

### 🏢 Organization Dashboard

The organization dashboard allows companies to manage their job positions and view developers available for a selected position.

<img width="3823" height="1917" alt="org dashboard 2" src="https://github.com/user-attachments/assets/7cd8bcee-cc02-4994-ae36-0a5efc5a4ad2" />

---

### 💼 Add a Position

Organizations can create job positions by entering a position name, description, and selecting up to five required technical skills.

<img width="3823" height="1832" alt="add postions" src="https://github.com/user-attachments/assets/089fa522-791c-43e6-adad-ca8a44df808a" />

---

### 🎯 Developer Matching

When an organization selects a position, DevsOnDeck filters developers according to the skills required for that position.

Only relevant developer profiles are displayed in the **Available Devs** section.

<img width="3839" height="1826" alt="available devs for front" src="https://github.com/user-attachments/assets/9d2210bf-250c-446f-b785-b3301f67cfd1" />

---

## 📁 Project Structure

The project follows a full-stack architecture with a clear separation between the frontend and backend.

The React frontend manages the user interface, while the Node.js/Express backend exposes REST API endpoints and handles authentication, database operations, and matching logic.

MongoDB Atlas is used as the cloud database, with Mongoose providing the connection between the Node.js backend and MongoDB.

---

## 🎓 Project Context

DevsOnDeck was developed as part of my **summer internship at Nefel Education** during the **2025–2026 academic year**.

The main objective of the project was to apply the MERN stack to the development of a complete full-stack web application and gain practical experience with frontend development, backend APIs, databases, authentication, and version control.

---

## 👩‍💻 Author

**Khouloud Daas**

Software Engineering Student at **ESPRIT – École Supérieure Privée d'Ingénierie et de Technologies**

Developed during a summer internship at **Nefel Education**.
