import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const __dirname = path.resolve(path.dirname(''));
    const filePath = path.join(__dirname, req.url === '/' ? '/front/index.html' : '/front' + req.url); // Use path.join for better path handling
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});