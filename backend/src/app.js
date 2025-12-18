import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.routes.js";

const app = express();

//CONFIG
app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
app.use(express.json());

//ROUTES
app.use("/contacts", contactRouter);

export default app;
