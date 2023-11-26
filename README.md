# Mongoose Express CRUD Mastery

This is a Node.js Express application with Typescript following modular pattern for USER and Order management system.

## User Guidelines

- first clone this github repogitory
  > > git clone https://github.com/likhon29/assignment2.git
- and then run the command:
  > > npm install
- Lastly Run the application using:
  > > npm run start:dev

## API Endpoints

    - POST /api/users
        Using this api end point you can create a new user
    - GET /api/users
        Using this api Retrieve a list of all users
    - GET /api/users/:userId
        Using this api Retrieve a specific user by ID
    - PUT /api/users/:userId
        Using this api Update user information
    - DELETE /api/users/:userId
        Using this api Delete a user
    - PUT /api/users/:userId/orders
        Using this Add New Product in Order
    - GET /api/users/:userId/orders
        Using this api Retrieve all orders for a specific user
    - GET /api/users/:userId/orders/total-price
        Using this api Calculate Total Price of Orders for a Specific User

# Technologies

- Node.js
- Express
- TypeScript
- Mongoose
- Zod Validator
