import http from "http";

import { app } from "./src/app";

const server = http.createServer(app);

server.listen(process.env.PORT ?? 5000);
