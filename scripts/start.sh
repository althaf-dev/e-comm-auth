#!/bin/bash
set -e

APP_DIR=/home/ubuntu/app
cd $APP_DIR

/usr/bin/pm2 stop all || true
/usr/bin/pm2 start src/app.js --name app
/usr/bin/pm2 save
