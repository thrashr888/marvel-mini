# DOCKER-VERSION 0.3.4
FROM peenuty/nodejs-npm-sass-docker

MAINTAINER Paul Thrasher "thrashr888@gmail.com"


WORKDIR /src

ADD package.json /src/
RUN npm install

ADD . /src

RUN bower install --allow-root

RUN cd /src; gulp build

EXPOSE  9000

CMD cd /src; gulp connect