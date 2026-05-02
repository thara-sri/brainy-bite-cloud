# BrainyBite - Full-Stack Article Management Platform
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)]()
[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)]()
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)]()

**BrainyBite** is a comprehensive content management system developed with a decoupled architecture, separating the React frontend from the Spring Boot backend. It features secure user authentication via AWS Cognito and efficient image asset management using AWS S3.


---

## Architecture & Cloud Deployment Strategy

This project has evolved through multiple iterations to demonstrate advanced proficiency in **Cloud-Native Design, Infrastructure Automation, and Cost Optimization**:

### Current Architecture: Production-Grade & Cost-Optimized
The current infrastructure is designed to emulate enterprise standards while maintaining near-zero operating costs. It utilizes a combination of AWS automated services, containerization, and edge networks:

1. **Frontend (Edge Network):** Hosted on **Vercel** for global CDN delivery, rapid CI/CD, and optimal frontend performance.
2. **Compute (Auto-Healing & Cost Efficient):** * Deployed on **AWS EC2 Spot Instances** (ARM64/t4g) for up to 90% cost savings.
   * Managed by an **Auto Scaling Group (ASG)** across multiple Availability Zones (AZs) to ensure High Availability (HA) and automatic instance replacement.
3. **Containerization & Orchestration:** * Backend services are containerized using **Docker**.
   * Images are securely stored in **Amazon ECR** with automated Lifecycle Policies to manage storage costs.
   * **Nginx** acts as a Reverse Proxy on the EC2 instance, utilizing Virtual Hosting (Server Blocks) to securely route traffic to multiple backend microservices.
4. **Security & Secrets Management:**
   * **AWS Systems Manager (SSM) Parameter Store** is used to inject sensitive environment variables dynamically at runtime via EC2 User Data scripts.
   * CI/CD pipelines utilize **OpenID Connect (OIDC)** for keyless, secure authentication with AWS, eliminating the need for long-lived Access Keys.
   * **Cloudflare** operates in `Full (Strict)` mode with Origin CA Certificates, providing edge-level DDoS protection and end-to-end encryption.
5. **Database:** **Neon.tech** (ap-southeast-1) provides a highly responsive, serverless PostgreSQL solution.
<img width="1001" height="659" alt="brainy-cloud drawio" src="https://github.com/user-attachments/assets/b8f07ddf-8c49-481f-a5dc-213a5f7a7dca" />
*Architecture Diagram.*

### Previous Iterations
* **Phase 1 (Enterprise/Lab Environment):** Utilized ALB, Multi-AZ RDS, and dedicated EC2 instances (Optimized for scale, high cost).
* **Phase 2 (Serverless Portfolio):** Migrated backend to Render.com (Optimized for simplicity).

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
* **Database:** PostgreSQL (Neon Serverless)

### Cloud & DevOps (The Core Engine)
* **CI/CD:** GitHub Actions (with QEMU/Buildx for ARM64 cross-compilation & OIDC AWS integration)
* **AWS Services:** EC2 (Spot), ASG, ECR, SSM Parameter Store, Cognito, S3, IAM.
* **Networking:** Cloudflare (DNS Auto-update via bash scripts, SSL), Nginx (Reverse Proxy)
* **Containerization:** Docker & Docker Compose

---

## Key Features
* **Authentication:** Secure user registration and login utilizing AWS Cognito (JWT Bearer Token validation).
* **Article Management:** Complete CRUD operations for articles (Create, Read, Update, Delete).
* **Image Upload:** Direct integration with AWS S3 for uploading and managing article cover images.
* **Infrastructure as Code (IaC) Concept:** Automated server provisioning using robust bash scripts in EC2 Launch Templates (installing tools, pulling secrets, configuring Nginx, and running containers dynamically).
* **Automated DNS Management:** EC2 instances automatically update Cloudflare A-Records with their new public IP upon spawning.

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
