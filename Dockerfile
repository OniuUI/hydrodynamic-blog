# Step 1: Build the React application and generate self-signed certificate
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the local src and public directories to the container
COPY . .

# Generate a self-signed certificate for blog.hydrodynamic.no
RUN openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=blog.hydrodynamic.no"

# Build the React app
RUN npm run build

# Step 2: Serve the React application using Nginx
FROM nginx:1.19.0-alpine

# Set the port the app runs on
EXPOSE 80 443

# Copy the build directory from the previous step to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the self-signed certificate and private key
COPY --from=build /app/cert.pem /etc/nginx/cert.pem
COPY --from=build /app/key.pem /etc/nginx/key.pem

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
