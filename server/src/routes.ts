import { FastifyRequest } from "fastify/types/request";
import { SqlQueryRequest } from "../types";
import { FastifyInstance, FastifyReply } from "fastify";
import { MysqlConnection } from "./mysql-connection";

module.exports = (server : FastifyInstance,connection : MysqlConnection) => {
    server.get('/databases', async (request: FastifyRequest, reply) => {
        const [rows] = await connection.query("SHOW DATABASES;");
        return rows.map((row: any) => row.Database);
    });
    
    server.get('/databases/:database/tables', async (request: FastifyRequest, reply) => {
        const [rows] = await connection.query("SHOW TABLES FROM " + (request.params as any).database);
        return rows.map((row: any) => Object.values(row)[0]);
    });

    server.get('/databases/:database/:table/columns', async (request: FastifyRequest, reply) => {
        const [rows] = await connection.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${(request.params as any).database}' AND TABLE_NAME = '${(request.params as any).table}';` );
        return rows.map((row: any) => Object.values(row)[0]);
    });
    
    server.post('/sql-query/:database', async (request: SqlQueryRequest, reply: FastifyReply) => {
        const rows = await connection.query(`USE ${request.params.database};${request.body.request}`)
            .then(([rows,fields]:[any[],any[]]) => {
                return rows[1];
            });
        return rows;
    });
    
    server.listen(8080, (err, address) => {
        if(err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`);
    });
}

