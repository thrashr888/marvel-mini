
# Marvel Mini

Marvel Mini is a showcase of Marvel comics and creators. It's a simple ReactJS driven, serverless app that can be hosted anywhere.

## Elsewhere

- Github:        https://github.com/thrashr888/marvel-mini
- Docker Builds: https://registry.hub.docker.com/u/thrashr888/marvel-mini/
- S3:            http://marvel-mini.s3-website-us-east-1.amazonaws.com/
- CloudFront:    http://d2kh2gtg6jtpy4.cloudfront.net/
- API Docs:      http://developer.marvel.com/docs

## Install

    > git clone https://github.com/thrashr888/marvel-mini.git
    > cd marvel-mini
    > npm install
    > bower install

## Develop

    > gulp watch
    > open http://localhost:9000/

## Test

    > gulp test

## Runtime

    > gulp build
    > gulp connect
    > open http://localhost:9000/

## Install Vagrant & Docker

    > # Install Vagrant with Homebrew
    > brew tap caskroom/homebrew-cask
    > brew install brew-cask
    > brew cask install virtualbox
    > brew cask install vagrant

    > # Run the Vagrant VM
    > vagrant init phusion/ubuntu-14.04-amd64
    > vagrant up
    > vagrant ssh

    > # Install Latest Docker in Vagrant
    > wget -qO- https://get.docker.io/gpg | sudo apt-key add -
    > sudo sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
    > sudo apt-get update
    > sudo apt-get install -qy lxc-docker

## Vagrant/Docker Build & Run

    > # Log into the Vagrant VM
    > vagrant up
    > vagrant ssh
    > # Build and run the app
    > cd /vagrant
    > sudo docker build -t thrashr888/marvel-mini .
    > sudo docker run -t -p 49160:9000 thrashr888/marvel-mini

## TODO

- Add h1 and meta tags.
- Add microdata to the markup for bots (http://schema.org/Book, http://schema.org/Person).
- Add more tests.
- Render in a server for bots.
- Make the build run the tests.

## Thanks

This app takes advantage of many open source libraries. Special thanks go to the creators of ReactJS, Browserify, Gulp, Bootstrap, Less, jQuery, HTML5 Boilerplate and Docker. Also a big thank you to Marvel for providing an open API.

## The MIT License (MIT)

Copyright (c) 2014 Paul Thrasher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
