# Container image that runs your code
FROM  node:lts-alpine3.14
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

ADD . .
ADD https://www.pdftron.com/downloads/CADModuleLinux.tar.gz /CAD
ENTRYPOINT ["node", "index.js"]