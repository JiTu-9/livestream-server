# Use the official Node.js 18 image (Alpine-based)
FROM node:18-alpine

# Install FFmpeg from Alpine repository
RUN apk update && \
    apk add --no-cache ffmpeg

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copying all the files
COPY . .

# Exposing ports
EXPOSE 8000
EXPOSE 1935

# Running the app
CMD ["npm", "start"]
