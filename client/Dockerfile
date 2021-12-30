FROM node:16

ENV PORT 3000

# Create app directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copying source files
COPY . .

# Building app
RUN yarn build

# expose port
EXPOSE 3000

# Running the app
CMD ["yarn", "dev"]
