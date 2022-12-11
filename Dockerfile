FROM node:alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

# Define the command to run the test
CMD ["npm", "test"]
