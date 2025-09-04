import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//local module
import filRouter from "./routes/textRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import deleteRouter from "./routes/deleteRoutes.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

app.use("/api", filRouter);
app.use("/api", aiRouter);
app.use("/api", deleteRouter);

app.listen(process.env.PORT, () => {
  `Server is running on port http://localhost:${process.env.PORT}`;
});
