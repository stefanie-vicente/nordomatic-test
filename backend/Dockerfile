# Use the Node.js 16.x base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Run Prisma migrations and seed
RUN npm run prisma:generate && npx prisma migrate deploy && npm run seed

# Expose the port that your server listens on (replace 4000 with your server's port)
EXPOSE 4000

# Start the server in production mode
CMD ["node", "dist/server.js"]
