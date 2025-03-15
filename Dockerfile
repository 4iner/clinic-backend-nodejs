# Use Node.js LTS (Long Term Support) version
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code and configuration files
COPY . .

# Create a .env file if it doesn't exist
RUN if [ ! -f .env ]; then \
    echo "PORT=3000" >> .env && \
    echo "JWT_SECRET=your_jwt_secret_here" >> .env && \
    echo "NODE_ENV=production" >> .env; \
    fi

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 