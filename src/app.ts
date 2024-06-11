import express, { Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello internet! This is car washing system.");
});

app.all("*", async (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: "No route found.",
  });
});

export default app;
