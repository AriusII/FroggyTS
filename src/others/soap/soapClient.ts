//import * as soap from 'soap';

export class SOAPWrapper {
    host: string | undefined;
    port: string | undefined;
    username: string | undefined;
    password: string | undefined;
    static host: string | null | undefined;
    static port: string | number | null | undefined;
    static username: any;
    static password: any;
    constructor() {
        this.host = process.env.SOAP_HOST;
        this.port = process.env.SOAP_PORT;
        this.username = process.env.SOAP_USERNAME;
        this.password = process.env.SOAP_PASSWORD;
    }

    public static async post() {

    }

    public static async get() {
    }
}
