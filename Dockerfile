FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
ENV PATH="/usr/src/app/node_modules/.bin:${PATH}"
RUN ng build
EXPOSE 3000
CMD [ "node", "./bin/www" ]
