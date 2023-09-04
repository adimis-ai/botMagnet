# Use the LTS version of Node as the builder stage
FROM node:lts as builder

# Set the working directory for the builder stage
WORKDIR /botmagnet

# Copy package.json and yarn.lock files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code and build the project
COPY . .
RUN yarn build

# Create the production stage
FROM node:lts

# Set the working directory for the production stage
WORKDIR /botmagnet

# Copy the build output from the builder stage
COPY --from=builder /botmagnet .

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to start the application
CMD ["yarn", "start"]
