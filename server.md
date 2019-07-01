# Project Setup

This is my first Go server/API implementation. For future reference, this document outlines the steps required to go from a clean install to a working demo environment.

## Install Go

Install Go via Snap

```sh
sudo snap install go --classic
```

Add the following to the bottom of `~/.profile`

```sh
export GOPATH=$HOME/.go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
```

Create the Go directory

```sh
mkdir ~/.go
```

Restart to ensure all environments are flushed and the new environment variables are set.

```sh
sudo shutdown -r
```

## Go Setup

Create a directory for the module

```sh
mkdir ~/shopping-cart
cd ~/shopping-cart
```

Initialize the Go module

```sh
go mod init github.com/evanplaice/shopping-cart
```

## Create a Static server

Create the entry point

```sh
touch main.go
```

## Create website files

```sh
mkdir -p static/stylesheets
touch static/index.html
touch static/stylesheets/main.css
```

## Appendix A: Useful commands

Clean up dangling dependencies

```sh
go mod tidy
```

Create a `vendor` directory for external deps

```sh
go mod vendor
```
