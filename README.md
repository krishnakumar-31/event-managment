# Online Event Booking and Management System

## Project Overview

The **Online Event Booking and Management System** is a web-based application developed to simplify event creation, event booking, and management processes. This system provides a platform where **users can browse and book events**, **organizers can create and manage events**, and **administrators can monitor the overall system**.

The project is built using **modern web technologies**:

* **Frontend:** React.js
* **Backend:** Python Flask
* **Database:** MySQL
* **API Testing:** Postman
* **Version Control:** Git/GitHub


---

## Features

### User Module

* User Registration
* User Login Authentication
* Browse Available Events
* View Event Details
* Book Tickets
* Receive Booking Confirmation
* View Booking History

### Organizer Module

* Organizer Login
* Create New Event
* Update Event Details
* Delete Event
* View Bookings for Own Events
* Manage Event Capacity

### Admin Module

* Manage Users
* Manage Events
* Monitor Bookings
* System Administration

---

## Technology Stack

| Component         | Technology      |
| ----------------- | --------------- |
| Frontend          | React.js        |
| Backend           | Flask (Python)  |
| Database          | MySQL           |
| API Communication | REST API        |
| Testing           | Postman         |
| Styling           | CSS / Bootstrap |


---

## System Architecture

```text
Frontend (React)
      ↓
REST API Calls
      ↓
Backend (Flask)
      ↓
MySQL Database
      ↓

---

## Database Design

### 1. Users Table

Stores user details.

Fields:

* id (Primary Key)
* name
* email
* password
* role

---

### 2. Events Table

Stores event information.

Fields:

* id (Primary Key)
* title
* description
* date
* location
* seats
* organizer_id

---

### 3. Bookings Table

Stores booking details.

Fields:

* id (Primary Key)
* user_id
* event_id
* ticket_id

---

## API Endpoints

### Authentication

* POST `/login`
* POST `/register`

### Events

* GET `/events`
* POST `/events`
* DELETE `/events/<id>`

### Bookings

* POST `/book`
* GET `/bookings`
* GET `/bookings/<organizer_id>`

---

## Project Workflow

### Step 1 – User Login

User logs into the system.

### Step 2 – Browse Events

User views available events.

### Step 3 – Book Event

User selects event and confirms booking.

### Step 4 – Booking Stored

Booking data saved in MySQL.

### Step 5 – Organizer View

Organizer sees bookings for their events.

### Step 6 – Admin Monitoring

Admin manages complete system.

---

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors flask-mysqldb
python app.py
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

* Online Payment Integration
* Email Notifications
* QR Ticket Generation
* Seat Selection
* Analytics Dashboard
* Cloud Deployment
* Mobile Responsive UI

---

## Conclusion

The **Online Event Booking and Management System** is a complete full-stack web application that demonstrates **database design, API development, frontend-backend integration, and role-based system management**. It provides a scalable solution for managing events efficiently in a digital environment.
