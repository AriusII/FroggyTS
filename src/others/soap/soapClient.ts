import * as http from 'http';
import net from 'net';

declare type CommandBuilder = string;
declare type Base64 = string;

export class SOAPClient {
    private socket: net.Socket;
    private authBase64: Base64;
    constructor() {
        this.socket = new net.Socket();
        this.authBase64 = Buffer.from(`${process.env.SOAP_USER}:${process.env.SOAP_PASS}`).toString('base64');
    }

    private async xmlbody(cmd: CommandBuilder) {
        const xml = `<?xml version="1.0" encoding="utf-8"?>
        <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="urn:${process.env.CORE}" xmlns:xsd="http://www.w3.org/1999/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <SOAP-ENV:Body>
                <ns1:executeCommand>
                    <command>${cmd}</command>
                </ns1:executeCommand>
            </SOAP-ENV:Body>
        </SOAP-ENV:Envelope>`;
        return xml;
    }

    private async HTTPBuilder(CommandSender: CommandBuilder) {
        const options = {
            method: 'POST',
            hostname: process.env.SOAP_HOST,
            port: process.env.SOAP_PORT,
            path: '/',
            headers: {
                'Content-Type': 'application/xml',
                'Authorization': `Basic ${this.authBase64}`
            },
        };
        const xml = await this.xmlbody(CommandSender);
        return new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    const result = data.split('<result>')[1].split('</result>')[0].replace(/&#xD;/g, '');
                    resolve(result);
                });
                res.on('error', (err) => {
                    reject(err);
                });
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.write(xml);
            req.end();
        });
    }


    private async port_check() {
        const options: any = {
            host: process.env.SOAP_HOST,
            port: process.env.SOAP_PORT
        };
        return new Promise((resolve, _reject) => {
            this.socket.setTimeout(1000);
            this.socket.connect(options, () => {
                this.socket.end();
                resolve('server_up');
            });
            this.socket.on('timeout', () => {
                this.socket.destroy();
                resolve('server_down');
            });
            this.socket.on('error', (err) => {
                this.socket.destroy();
                console.log(err);
                resolve('server_down');
            });
        });
    }

    async send(CommandSender: CommandBuilder) {
        const isOpen = await this.port_check();
        switch (isOpen) {
            case 'server_up':
                const res = await this.HTTPBuilder(CommandSender);
                return res;
            case 'server_down':
                return 'server_down';
        }
    }
}