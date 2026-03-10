# Use the official Node.js image
FROM node:18

# Set the working directory to the root of the project inside the container
WORKDIR /usr/src/app

# 1. Copy the package files to a 'Back' folder inside the container
COPY Back/package*.json ./Back/

# 2. Install dependencies inside the 'Back' folder
RUN cd Back && npm install

# 3. Copy the rest of your project files (Front and Back)
COPY . .

# 4. Change directory to 'Back' so the server runs in the correct context
WORKDIR /usr/src/app/Back

# Expose the port (Update this if your server.js uses a different port)
EXPOSE 3000

# Start the server
CMD [ "node", "server.js" ]