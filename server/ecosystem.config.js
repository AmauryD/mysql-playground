require("dotenv").config({path: "env.deploy.production"});

module.exports = {
  apps : [{
    script: './server/index.js',
    env: {
      "HOST": "localhost",
      "USER": "cours",
      "PASSWORD": "cours",
    }
  }],

  deploy : {
    production : {
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      user: process.env.SSH_USER,
      ref  : 'origin/master',
      repo : 'https://github.com/AmauryD/mysql-playground.git',
      path : '/var/www/api/',
      'pre-deploy-local': '',
      'post-deploy' : 'cd ./server && npm install && tsc && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
