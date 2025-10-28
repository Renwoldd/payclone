FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# FROM node:20-alpine

# WORKDIR /app

# # Copy package files first
# COPY package.json package-lock.json* ./

# # Expose Vite's port
# EXPOSE 5173

# # Install and run dev server
# CMD npm install && npm run dev -- --host 0.0.0.0