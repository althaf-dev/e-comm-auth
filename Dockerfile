FROM node

WORKDIR /app/auth

COPY  src src

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

CMD ["npm" , "run" , "start"]