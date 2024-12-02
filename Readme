
# **Social Restaurant Booking API**

## **Description**
The **Social Restaurant Booking API** is a backend application designed to manage restaurant reservations based on diners' dietary restrictions and table availability. This project is built using TypeScript, Express, and TypeORM, providing a robust and modular API with advanced input validation powered by **Joi**.

### **Key Features**:
- Filter restaurants that meet the dietary restrictions of a group of diners.
- Check the availability of tables for a specific time.
- Create reservations while ensuring no overlapping time slots.
- Includes a seed script to initialize data from an Excel file.

---

## **Technologies and Tools**
- **Node.js** and **Express**: Core framework for building the API.
- **TypeScript**: Strongly typed JavaScript for enhanced code maintainability.
- **TypeORM**: Object-Relational Mapping (ORM) to interact with the PostgreSQL database.
- **PostgreSQL**: Database used for storing restaurants, tables, diners, and reservations.
- **Joi**: Library for validating user input in API requests.
- **Jest** and **Supertest**: Tools for writing and executing unit and integration tests.
- **Docker**: Used to containerize the application and database for easy deployment.
- **xlsx**: Library for reading and processing Excel files during the seed operation.

---

## **Prerequisites**
- **Docker** and **Docker Compose** installed on your system.

---

## **Setup Instructions**

### **Step 1: Clone the repository**
```bash
git clone <repository-url>
cd social-restaurant-booking-api
```

### **Step 2: Setup environment variables**
Create a `.env` file in the root directory and add the following:
```
DB_HOST=database
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=social_restaurant
```

### **Step 3: Build and run the containers**
Use Docker Compose to build and start the application:
```bash
docker-compose up --build
```

This will start both the API server and the PostgreSQL database.

### **Step 4: Seed the database**
Run the seed script to populate the database with initial data:
```bash
docker exec -it <api-container-name> npm run seed
```

Replace `<api-container-name>` with the name of the API container, which you can find using:
```bash
docker ps
```

### **Step 5: Access the API**
The API will be available at `http://localhost:3000`.

---

## **API Endpoints**
### **1. Search for Restaurants**
**POST** `/restaurants/search`

Request body:
```json
{
  "dinerIds": [1, 2, 3],
  "time": "2024-12-01T19:30:00Z"
}
```

### **2. Make a Reservation**
**POST** `/restaurants/reserve`

Request body:
```json
{
  "tableId": 1,
  "dinerIds": [1, 2],
  "time": "2024-12-01T19:30:00Z"
}
```

---

## **Project Structure**
```
src/
├── config/                # Database configuration
├── controllers/           # Handles HTTP requests
├── entities/              # TypeORM entities (database models)
├── routes/                # API route definitions
├── seed/                  # Seed script and sample data
├── services/              # Business logic
├── validation/            # Joi validation schemas
├── __tests__/             # Unit and integration tests
├── app.ts                 # Express application setup
├── server.ts              # Server entry point
```

---

## **Testing**

### **1. Setup**
Before running tests, ensure the database container is running:
```bash
docker-compose up
```

### **2. Run Tests**
Run all tests using Jest:
```bash
npm run test
```

### **3. Watch Mode**
Run tests in watch mode for continuous testing:
```bash
npm run test:watch
```

### **4. Test Coverage**
To generate a test coverage report:
```bash
npm run test -- --coverage
```

### **Test Examples**
- Unit tests are located in the `src/__tests__/` folder.
- Includes tests for controllers (`controllers/`) and services (`services/`).

Example Test Case:
```typescript
describe("Restaurant Controller", () => {
  it("should return 400 if dinerIds or time is missing", async () => {
    const response = await request(app).post("/restaurants/search").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Diner IDs and time are required.");
  });
});
```

