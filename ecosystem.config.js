require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.PM2_CLUSER_NAME||'app-cloner',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './index.js',
      args: 'start'
    }
  ]
}