# Container image that runs your code
FROM ubuntu:20.04
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get -y install nodejs libgl1-mesa-dev libx11-dev libglu1-mesa-dev
RUN npm install --global yarn
COPY package.json /package.json
COPY yarn.lock /yarn.lock
RUN yarn install

ADD index.js /index.js
ADD https://www.pdftron.com/downloads/CADModuleLinux.tar.gz /CADModuleLinux.tar.gz
RUN tar -xzf /CADModuleLinux.tar.gz -C /
ENTRYPOINT ["node", "/index.js"]