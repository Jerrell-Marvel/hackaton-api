// Express
import express from "express";
const app = express();

// Request
import request from "request";

// Express async errors
import "express-async-errors";

// Error handler
import { errorHandler } from "./middleware/errorHandler.js";

// dotenv
import dotenv from "dotenv";
dotenv.config();

// Mongoose
import mongoose from "mongoose";

// Cors
import cors from "cors";

// Parse json
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
  })
);

import axios from "axios";

import fetch from "node-fetch";

app.get("/", async (req, res) => {
  //   const clientServerOptions = {
  //     uri: "http://34.101.154.14:8175/hackathon/user/auth/create",
  //     body: JSON.stringify({ username: "asep test", loginPassword: "12345678" }),
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   request(clientServerOptions, function (error, response) {
  //     console.log(error, response.body);
  //     return res.json(response);
  //   });
  //   try {
  //     const response = await axios.post("http://34.101.154.14:8175/hackathon/user/auth/create", {
  //       username: "asep test",
  //       loginPassword: "12345678",
  //     });
  //     // console.log(JSON.stringify(response));
  //     const data = response.data;
  //     return res.json(data);
  //   } catch (err) {
  //     // console.log(err);
  //     return res.json(err.data);
  //   }
  try {
    const response = await fetch("http://34.101.154.14:8175/hackathon/user/auth/create", {
      method: "POST",
      body: JSON.stringify({ username: "asep test", loginPassword: "12345678" }),
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data);

    return res.json("err");
  } catch (err) {}
  console.log(response);
  const data = await response.json();
  console.log(data);
  res.json(data);
});

//Error handling
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, async () => {
  console.log("Connecting to mongodb");
  try {
    // await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log("Failed to connect to mongodb");
  }
});
