# Use the Node.js 16.x base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the Next.js server listens on (usually 3000)
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "start"]
