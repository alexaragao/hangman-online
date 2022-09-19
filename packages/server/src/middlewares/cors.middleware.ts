import cors, { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

export { corsMiddleware };
