const mysql = require('mysql2/promise');

export class MysqlConnection {
    private connection : any;

    public constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            user: 'cours',
            password: 'cours',
            waitForConnections: true,
            multipleStatements: true,
            connectionLimit: 10,
            queueLimit: 0
          });
    }

    public query(query: string,options? : object) {
        return this.connection.query(query,options);
    }
}