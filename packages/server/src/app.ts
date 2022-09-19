import express from "express";
import { corsMiddleware } from "./middlewares/cors.middleware";

const app = express();

app.use(corsMiddleware);

export { app };
