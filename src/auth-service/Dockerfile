# Use official Node.js image
FROM node:23-alpine

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
