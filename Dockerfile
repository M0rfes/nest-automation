# Base image
FROM node:18 as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

FROM node:18 as production

# Create app directory
WORKDIR /usr/src/app

# Copy the production build from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Install playwright
RUN npx playwright install-deps

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]