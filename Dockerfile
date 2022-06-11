# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM arm32v6/nginx:alpine

RUN apk add -U tzdata
ENV TZ=Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime


# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/party-anniversary /app
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80