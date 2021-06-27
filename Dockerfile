FROM node:lts-alpine

WORKDIR /code

COPY package_server.json package.json

ENV GITEE_USER=""\
    GITEE_TOKEN=""\
    MINDBOX_REPO=""\
    MINDBOX_GITEE_ENABLE=1

COPY dist/ ./dist
COPY server.js ./
RUN npm install --registry=https://registry.npm.taobao.org
LABEL maintainer="Xiaohao Liu <liuxiaohao@cuc.edu.cn>"
EXPOSE 80

CMD [ "node", "server.js" ]
