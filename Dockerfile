FROM node:16

WORKDIR /app
COPY package.json /app

RUN apt-get update -y \
    && apt-get install -y \
    aspell \
    bash \
    redis \
    && apt-get clean
RUN npm install


COPY . /app
CMD ["npm","start"]