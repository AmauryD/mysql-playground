import fastify from 'fastify';
import { MysqlConnection } from './src/mysql-connection';

const server = fastify();
const Router = require("./src/routes");

server.register(require('fastify-cors'), { 
  // put your options here
});

server.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    try {
      console.log(body)
      var json = JSON.parse(body.toString());
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
});

const connection = new MysqlConnection();

const router = Router(server,connection);
