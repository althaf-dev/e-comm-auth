#!/bin/bash
pm2 stop all || true
pm2 start src/app.js
pm2 save
