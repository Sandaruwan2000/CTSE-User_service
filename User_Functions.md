# User Service - Core Functions & Cloud Role

## Overview
The **User Service** is responsible for managing authentication, authorization, and user profiles within the online bookstore application. This service acts as the gatekeeper for the system, ensuring that only authenticated users can place orders and only administrators can manage the book catalog.

## Core Functions
1. **User Registration & Authentication (JWT):** Generates secure JSON Web Tokens upon successful login, allowing stateless authentication across all other microservices without hitting the database on every request.
2. **Profile Management:** Allows users to view and update their personal details seamlessly.
3. **Role-based Access Control (RBAC):** Differentiates between standard `user` and `admin` roles, guarding administrative endpoints.
4. **Inter-service Communication:** Supplies authenticated identity data to the Order and Payment services. Both services depend on the User service payload (via tokens) to execute transactions securely.

## DevOps & Cloud Implementation
- **Containerization:** Packaged using a lightweight Node.js Docker image (`Dockerfile`).
- **Cloud Deployment:** Designed to be deployed on ECS or Azure Container Apps as an independently scalable instance.
- **Security Scope:** Adheres to DevSecOps principles by securely hashing passwords (e.g., bcrypt), ensuring DB connections are secured, and limiting external network access using cloud Security Groups.
