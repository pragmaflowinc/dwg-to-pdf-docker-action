# Container image that runs your code
FROM ubuntu:20.04
WORKDIR /app
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get -y install nodejs
RUN npm install --global yarn
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

ADD index.js index.js
ADD https://www.pdftron.com/downloads/CADModuleLinux.tar.gz CADModuleLinux.tar.gz
RUN tar -xzf CADModuleLinux.tar.gz
ENTRYPOINT ["node", "index.js"]