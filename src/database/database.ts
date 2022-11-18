import mysql from 'mysql2/promise';

export class Database {
    private static _instance: Database;
    private pool: mysql.Pool;
    
    public constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            connectionLimit: 10,
        });
    }
    
    public static get instance() {
        return this._instance || (this._instance = new this());
    }
    
    // Query the database, we have two parameters, the query and the values, values are optional and are stored in an array
    public async query(query: string, values?: any) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.query(query, values);
            return result;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    }
}