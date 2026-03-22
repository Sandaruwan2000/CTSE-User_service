# User Service - Interactions & Use Cases

## 🎯 Core Use Cases
1. **User Registration & Onboarding:** Captures user details securely and stores them in the isolated User database.
2. **Authentication (Login):** Validates credentials and issues a secure signed JSON Web Token (JWT) that can be passed to other services.
3. **Role Management:** Determines if a user is a standard customer or an administrator, ensuring secure endpoints remain protected.

## 🤝 Interacting Services

### 1. Interacts with: Every Other Service (Book, Order, Payment)
**Type of Interaction:** Indirect / Token-based Identity Propagation.
- **Why (Rationale):** The User Service itself does not proactively make HTTP calls *to* the other services. Instead, it provides the secure JWT. When the client accesses the **Order** or **Payment** service, those services parse the token issued by the User Service to identify *who* is making the request and verify their role.
- **Use Case Example:** A user wants to view their past orders. They send a request to the Order Service holding the JWT. The Order Service extracts the `userId` from the token (originally signed by the User Service) to fetch only that specific user's orders.

### 2. Interacts with: Order Service
**Type of Interaction:** Direct Data Retrieval (Synchronous).
- **Why (Rationale):** Sometimes the Order service needs to attach user details (like Email for receipt sending) to an order. It can perform an HTTP `GET /api/users/:id` request to fetch the user's primary contact details.
- **Use Case Example:** The Order service is preparing an invoice payload and queries the User Service to inject the customer's full name and address into the digital receipt.
