import express, { Request, Response } from "express";

const app = express();
app.get("/api/", (_req: Request, res: Response) => {
  return res.send("Backend!");
});

app.listen(8000);
