import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import storeRoutes from "./routes/store.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import redis from "redis";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5002;

let redisClient;
(async () => {
  redisClient = redis.createClient({
    password: process.env.REDIS_PW,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/store", storeRoutes);
app.get("/", (req, res) => {
  res.send("Server running!");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
  })
  .catch((error) => console.log(`${error}, Did not connected`));
