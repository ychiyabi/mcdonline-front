# Use Node.js as base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Expose the port Next.js will run on
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "run", "dev"]