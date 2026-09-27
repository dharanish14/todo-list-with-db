# Node.js 20 lightweight Alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy source files
COPY . .

# Expose backend port
EXPOSE 5000

# Set environment variable
ENV NODE_ENV=production

# Start Express server
CMD ["node", "src/index.js"]
