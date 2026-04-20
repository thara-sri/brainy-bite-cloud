# BrainyBite - Full-Stack Article Management Platform
[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Website-success?style=for-the-badge&logo=vercel)](https://brainy-bite.thara-sritharadol.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)]()
[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)]()
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)]()

**BrainyBite** is a comprehensive content management system developed with a decoupled architecture, separating the React frontend from the Spring Boot backend. It features secure user authentication via AWS Cognito and efficient image asset management using AWS S3.

**Live Website:** [https://brainy-bite-cloud.vercel.app](https://brainy-bite-cloud.vercel.app)

---

## Architecture & Cloud Deployment Strategy

This project is an evolution of a university laboratory assignment, re-architected to demonstrate proficiency in cloud-native design, resource management, and cost optimization:

### Original Architecture (University Lab Environment)
The initial version was designed for enterprise scale, fully leveraging AWS native services (supported by student credits):
* **Compute:** `Amazon EC2` instances provisioned separately for frontend and backend services.
* **High Availability:** Traffic routing managed by an `Application Load Balancer (ALB)`.
* **Database:** `Amazon RDS (PostgreSQL)` configured with `Multi-AZ` deployment for failover capabilities.
* **Storage & Auth:** `Amazon S3` for media storage and `Amazon Cognito` for identity management.
<img width="805" height="781" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/77348464-a8f5-4d6b-97ca-93def8d9b750" />


### Current Architecture (Cost-Optimized Portfolio Version)
To sustainably host this project as a personal portfolio, the architecture was redesigned adopting a **Best-of-Breed** cloud strategy. This approach maintains high performance while strictly adhering to free-tier limits, significantly reducing operational costs (eliminating expensive RDS and EC2 instances):

1. **Frontend (React):** Migrated to **Vercel** for its global edge network and seamless CI/CD pipeline.
2. **Backend (Spring Boot):** Containerized using **Docker** and deployed as a web service on **Render.com**.
3. **Database (PostgreSQL):** Transitioned to **Neon.tech** (ap-southeast-1 region) for a highly responsive, serverless database solution.
4. **Authentication & Storage:** Retained **AWS Cognito** (User Pool) and **AWS S3** to ensure enterprise-grade security and identity management.

*(This strategic shift optimized the monthly infrastructure cost from enterprise-level to $0, without compromising application functionality.)*

---

## Tech Stack

### Frontend
* **Framework:** React (Vite) + TypeScript
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios (configured with interceptors for JWT token management)

### Backend
* **Framework:** Spring Boot 3 (Java 17)
* **Security:** Spring Security (OAuth2 Resource Server)
* **ORM:** Spring Data JPA / Hibernate
* **Database:** PostgreSQL

### Cloud & DevOps
* **AWS:** Cognito (Authentication) & S3 (Image Storage)
* **Deployment:** Vercel (Frontend), Render (Backend), Neon (Database)
* **Containerization:** Docker & Dockerfile (Multi-stage build)

---

## Key Features
* **Authentication:** Secure user registration and login utilizing AWS Cognito (JWT Bearer Token validation).
* **Article Management:** Complete CRUD operations for articles (Create, Read, Update, Delete).
* **Image Upload:** Direct integration with AWS S3 for uploading and managing article cover images.
* **CORS Management:** Strictly configured Cross-Origin Resource Sharing bridging the Vercel edge network and Render backend.
* **Environment Profiles:** Distinct configuration setups leveraging `application-dev.properties` (Local) and `application-prod.properties` (Cloud).

## Local Development Setup

To run this project locally, follow these steps:

### 1. Backend (Spring Boot)
1. Ensure Java 17 and Maven are installed.
2. Set up a local PostgreSQL database.
3. Update `src/main/resources/application-dev.properties` with your local Database URL, AWS S3 Credentials, and Cognito Issuer URI.
4. Execute the following commands:
   ```bash
   cd brainybite-new
   ./mvnw spring-boot:run
   ```
### 2. Frontend (React)
1. Ensure Node.js is installed.
2. Create a `.env` file in the `brainybite-frontend` directory with the following variables:
    ```properties
    VITE_API_URL=http://localhost:8080/api
    VITE_AWS_USER_POOL_ID=your_pool_id
    VITE_AWS_USER_POOL_CLIENT_ID=your_client_id
    ```
3. Execute the following commands:
    ```bash
    cd brainybite-frontend
    npm install
    npm run dev
    ```
*Developed with herat as a demonstration of Full-Stack & Cloud Architecture capabilities.*

## Screenshot
<img width="1920" height="1080" alt="Screenshot (387)" src="https://github.com/user-attachments/assets/8af4c87e-0ef7-426b-a997-ee8c6f58b6db" />
<img width="1920" height="1080" alt="Screenshot (388)" src="https://github.com/user-attachments/assets/01d68210-df54-4cc5-8edb-2f66585f875d" />
<img width="1920" height="1080" alt="Screenshot (389)" src="https://github.com/user-attachments/assets/e285ff0f-0713-46db-960b-f6d734add4d9" />
<img width="1920" height="1080" alt="Screenshot (391)" src="https://github.com/user-attachments/assets/52faa80b-2f83-43a8-887e-d953fe32df88" />
<img width="1920" height="1080" alt="Screenshot (392)" src="https://github.com/user-attachments/assets/c5ab76e5-0961-47be-be87-251a91a35e20" />
