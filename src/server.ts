import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { mainRouter } from "./routes/main";

const server = express();
const port = process.env.PORT || 3000;
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

server.use("/api", mainRouter);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
