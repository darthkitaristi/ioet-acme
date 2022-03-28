FROM node:12-alpine
RUN mkdir /ioet-acme
WORKDIR /ioet-acme
COPY package*.json ./ 
COPY nodemon.json ./
COPY tsconfig.json ./  
COPY /src ./src
COPY /tests ./tests
RUN npm install
CMD npm start