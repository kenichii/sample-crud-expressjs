const http = require('http');
const app = require('./app')
const db = require("./db");

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        app.listen(3000, () => {
            console.log('connected to database, app listening on port 3000')
        });
    }
});

