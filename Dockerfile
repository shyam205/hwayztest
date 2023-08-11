# Use an official Node.js LTS image as the base
FROM node:lts-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and lock files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy the entire project directory into the container
COPY . .

# Build the app for production
RUN yarn run build

# Stage 2: Serve the built app using a lightweight HTTP server
FROM node:lts-alpine as production

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist ./dist

# Install a simple HTTP server to serve the app
RUN npm install -g http-server

# Set the command to start the HTTP server
CMD ["http-server", "dist", "-p", "80"]