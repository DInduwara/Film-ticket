# 🎬 Film Ticket API

A prototype backend system for managing **film ticket data** using **Node.js**, **Cassandra**, and **Docker**.  
This project demonstrates **CRUD operations** (Create, Read, Update, Delete) with a **NoSQL database** in a containerized environment.

---

## 🚀 Overview

This API allows:
- Adding new movie tickets  
- Viewing all tickets or individual tickets  
- Updating ticket information  
- Deleting tickets  

It is built to serve as a foundation for a full-featured **movie ticket booking system**.

---

## 🧩 Tech Stack

| Component | Technology |
|------------|-------------|
| Backend | Node.js (Express.js) |
| Database | Apache Cassandra |
| Containerization | Docker & Docker Compose |
| Language | JavaScript (ESM syntax) |
| Libraries | `uuid`, `cassandra-driver`, `dotenv` |

---

## ⚙️ Features

- RESTful API endpoints for tickets  
- UUID-based unique ticket IDs  
- Cassandra keyspace and table for scalable data storage  
- Docker containerized environment for easy deployment

---

## 📂 Project Structure
movie-ticket-api/
├── package.json
├── .env
├── docker-compose.yml
└── src/
├── app.js
├── cassandra.js
└── routes/
└── tickets.js

---

## 🛠️ Setup Instructions

### 1️⃣ Prerequisites

- Node.js & npm
- Docker & Docker Compose
- Postman or curl for testing

### 2️⃣ Clone the Repository

```bash
git clone 
cd movie-ticket-api
npm install


### 3️⃣ Configure Environment Variables

CASSANDRA_HOST="
CASSANDRA_KEYSPACE="
PORT="


### 4️⃣ Run Cassandra using Docker
docker-compose up -d

Check Cassandra:
docker ps
docker exec -it cassandra cqlsh

Create keyspace and table in cqlsh:

CREATE KEYSPACE movie_ticket WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE movie_ticket;
CREATE TABLE tickets (
  id UUID PRIMARY KEY,
  movie_name TEXT,
  customer_name TEXT,
  seat_number TEXT,
  price DECIMAL
);


### 5️⃣ Start Node.js API
npm start


Output:

✅ Connected to Cassandra
🚀 Server running on port 3000

---

## 🔍 API Endpoints
Method	Endpoint	Description
POST	/tickets	Create a new ticket
GET	/tickets	Get all tickets
GET	/tickets/:id	Get ticket by ID
PUT	/tickets/:id	Update ticket by ID
DELETE	/tickets/:id	Delete ticket by ID

---

##📊 Sample Request/Response

Create Ticket

POST /tickets
{
  "movie_name": "Inception",
  "customer_name": "John Doe",
  "seat_number": "A10",
  "price": 1500
}


Response

{
  "message": "Ticket created",
  "id": "f2e4d7f2-0c12-4f18-b3a7-9e1f2b9a9e21"
}
