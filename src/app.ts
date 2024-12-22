import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { notFound } from "./middlewares/notFound";
import { globalErrorResponse } from "./middlewares/globalErrorResponse";

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "https://ph-next-assign-3.onrender.com"] }));
app.use(express.json());
app.use(express.text());

// use the api routes 
app.use("/api", router);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello internet! This is car washing system.");
});

// not found response
app.all("*", notFound);

// global error response
app.use(globalErrorResponse);

export default app;
