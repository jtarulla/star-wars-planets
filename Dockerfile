# Build the application
FROM node

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm i

# Copy the source files
COPY . .

# Expose the serve port
EXPOSE 3000

# Start the application
CMD ["npm", "run",  "dev"]
