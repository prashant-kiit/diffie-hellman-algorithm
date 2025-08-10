import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authorisor from "./authorisor.js";

const server = express();
const PORT = process.env.PORT || 8000;
const SECRET = process.env.SECRET || "MY_SECRET";

const users = [
  {
    username: "Prashant",
    password: "12345",
  },
  {
    username: "Chinku",
    password: "12345",
  },
];

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(cookieParser());

server.get("/login", (req, res) => {
  try {
    const { username, password } = req.query;
    const user = users.filter(
      (user) => user?.username === username && user?.password === password
    );
    if (user.length === 0) throw new Error("User is not found");

    console.log(user);
    const token = jwt.sign({ username: user[0]?.username }, SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      status: "success",
      message: `User ${user[0]?.username} logged in`,
    });
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
    return;
  }
});

server.use(authorisor);

server.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    message: users,
  });
  return;
});

server.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ status: "success", message: "Logged out" });
  return;
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
