import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoutes";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err.message));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK" });
});

app.use("/api/user", UserRoute);

app.listen(3000, () => {
  console.log("listening on localhost:3000");
});
