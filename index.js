// Express
import express from "express";
const app = express();

// Request
import request from "request";

// Express async errors
import "express-async-errors";

// Error handler
import { errorHandler } from "./middleware/errorHandler.js";

import http from "http";

// dotenv
import dotenv from "dotenv";
dotenv.config();

// Mongoose
import mongoose from "mongoose";

// Cors
import cors from "cors";

// Routes imposrt
import merchantStoreRoutes from "./routes/merchantStore.js";
import chargeRoutes from "./routes/charge.js";
import webRoutes from "./routes/web.js";
import analyticRoutes from "./routes/analytic.js";

// Parse json
app.use(express.json());

app.use(express.static("public"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
  })
);

import axios from "axios";

//Routes
app.use("/", merchantStoreRoutes);
app.use("/", chargeRoutes);
app.use("/", webRoutes);
app.use("/", analyticRoutes);

app.get("/", async (req, res) => {
  return res.json("ngo");
  //   const request = http.request("http://34.101.154.14:8175/hackathon/user/auth/create", (response) => {
  //     console.log(`Status Code: ${response.statusCode}`);
  //     let data = "";
  //     response.on("data", (chunk) => {
  //       data += chunk;
  //     });
  //     response.on("end", () => {
  //       console.log("response Data:", data);
  //       return response.json(data);
  //     });
  //   });
  //   req.on("error", (error) => {
  //     console.error("Error:", error);
  //   });
  //   try {
  //     const response = await axios.post(
  //       "http://34.101.154.14:8175/hackathon/bankAccount/info",
  //       {
  //         accountNo: "5859452521378656",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJ1aWQiOjcsImlzcyI6IkJOQyIsImV4cCI6MTY5MDUzMzc0MCwiaWF0IjoxNjkwNTMyODQwfQ.83bLW6rB5EE4J2kt2L1W-HYbJbdejnAPin87Kwla2N`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     return res.json(response.data);
  //   } catch (err) {
  //     return res.json(err);
  //   }
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
  //   try {
  //     const response = await fetch("http://34.101.154.14:8175/hackathon/user/auth/create", {
  //       method: "POST",
  //       body: JSON.stringify({ username: "asep test", loginPassword: "12345678" }),
  //     });
  //     console.log(response.status);
  //     const data = await response.json();
  //     console.log(data);
  //     return res.json("err");
  //   } catch (err) {}
  //   console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  //   res.json(data);
});

//Error handling
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, async () => {
  console.log("Connecting to mongodb");
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log("Failed to connect to mongodb");
  }
});
