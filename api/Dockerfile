# install node
FROM node:alpine

# make the 'api' folder the current working directory
WORKDIR /

# copy both 'package.json' and 'package-lock.json'
COPY ./package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . .

EXPOSE 3000

# serve application in development
CMD [ "node", "server.js" ]