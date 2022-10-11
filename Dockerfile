FROM node:18-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN chmod +x /usr/src/app/node_modules/@angular/cli/bin/ng
ENV PATH="/usr/src/app/node_modules/.bin:/usr/src/app/node_modules/@angular/cli/bin:${PATH}"
RUN npm run build
EXPOSE 3000
CMD [ "node", "./bin/www" ]
