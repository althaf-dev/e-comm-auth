#!/bin/bash
set -e

APP_DIR=/home/ubuntu/app

sudo chown -R ubuntu:ubuntu $APP_DIR

cd $APP_DIR
npm install
