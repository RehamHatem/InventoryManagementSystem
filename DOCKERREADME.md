 Inventory Management System - Docker Deployment

This guide will help you quickly run the Inventory Management System using Docker.


##  Prerequisites

Before getting started, please ensure the following:

1. **Install Docker Desktop**

   Download and install Docker Desktop from the official site:  
   https://www.docker.com/products/docker-desktop/

2. **Start Docker Desktop**

   Make sure Docker Desktop is running before moving forward.
   Make sure port 8080 (for the Laravel app) and 3307 (for MySQL) are free.


##  Steps to Run the Application

1. Open **CMD** or **PowerShell**.

2. Navigate (`cd`) to the folder containing the `docker-compose.yml` file.

3. Run the following command:

   docker compose up -d

   Wait until containers are up and running, then visit:
   🔗 http://localhost:8080

Note: The docker-compose.yml file must be present in the same directory where this command is executed.

##  Common Commands

1. Start Containers -> docker compose up -d

2. Stop Containers -> docker compose down

3. Rebuild Containers (after code or dependency changes) -> docker compose build --no-cache -> then -> docker compose up -d

4. View Logs -> docker compose logs -f





   

