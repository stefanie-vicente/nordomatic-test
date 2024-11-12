# Full Stack Developer Tech Test Assignment: Building Control

This project is a monorepo with a **backend** and a **frontend** application, both of which are set up to work in a Dockerized environment. Below are instructions on how to get started using Docker and Docker Compose to run the full application stack.

## Prerequisites

- **Docker**: Ensure Docker is installed on your system. [Download Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Docker Compose is usually included with Docker Desktop on Windows and macOS. For Linux, you may need to install it separately. [Install Docker Compose](https://docs.docker.com/compose/install/)

## Folder Structure

This monorepo includes two main applications:

- **backend/** - Contains the backend server code.
- **frontend/** - Contains the frontend application.

Each of these folders has its own `README.md` with additional setup instructions specific to that application.

## Running the Project with Docker Compose

This project uses **Docker Compose** to run both the backend and frontend services. Docker Compose makes it easy to manage and connect multiple services for local development and testing.

### Steps to Run the Project

1. **Clone the Repository**:  
   Start by cloning this repository from GitHub or Bitbucket to your local machine.
    ```bash
   git clone https://github.com/stefanie-vicente/nordomatic-test.git
   ```

2. **Build and Start the Containers**:  
   In the root directory, where the `docker-compose.yaml` file is located, run:
   ```bash
   docker-compose up --build
   ```
   This command will:
   - Build the Docker images for both the frontend and backend services.
   - Start both containers and map the appropriate ports.

   > **Note:** You can add the `-d` flag to run the containers in the background:
   > ```bash
   > docker-compose up -d --build
   > ```

3. **Access the Applications**:
   - **Frontend**: Available at [http://localhost:3000](http://localhost:3000).
   - **Backend**: Accessible on [http://localhost:4000](http://localhost:4000).

3. **Stop the Services**:
   To stop and remove the containers, run:
   ```bash
   docker-compose down
   ```
   This command will stop and clean up any containers started by Docker Compose.

## Additional Information

- **Environment Variables**: The `docker-compose.yaml` file sets up environment variables for both services. Ensure you configure additional environment variables in the individual service's `.env` files if required.
- **Service Logs**: To view logs for any service, you can use:
  ```bash
  docker-compose logs <service-name>
  ```
  Replace `<service-name>` with `backend` or `frontend` to see logs for that specific service.

For more details on the backend or frontend applications, please refer to the `README.md` files located in their respective directories.

