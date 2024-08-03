"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const corsConfig = (req, res, next) => {
    const allowedOrigins = ['*'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin || '')) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, HEAD, PATCH");
    next();
};
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;
const app = new app_1.App(corsConfig);
app.listen(PORT);
