import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import keytar from "keytar";
import authorisor from "./authorisor.js";
import { encrypt } from "./basicEncrypt.js";
import modPow from "./modPow.js";

const server = express();
const PORT = process.env.PORT || 8000;
const SECRET = process.env.SECRET || "MY_SECRET";
const KEY = process.env.KEY || "mysecretkey";

const users = [
  {
    username: "Prashant",
    password: "12345",
  },
  {
    username: "Chinku",
    password: "12345",
  },
  {
    username: "Ram",
    password: "12345",
  },
];

server.use(
  cors({
    origin: "http://localhost:4173",
    credentials: true,
  })
);
server.use(cookieParser());

server.get("/login", async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = users.filter(
      (user) => user?.username === username && user?.password === password
    );
    if (user.length === 0) throw new Error("User is not found");

    console.log(user);
    const token = jwt.sign({ username: user[0]?.username }, SECRET);

    await keytar.setPassword(
      "DiffieHellmanApp",
      `KEY-${user[0]?.username}`,
      KEY
    );

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

server.get("/verify-token", (req, res) => {
  const username = req.user?.username as string;

  res.status(200).json({
    status: "success",
    message: `User ${username} already logged in`,
  });
  return;
});

server.get("/key", async (req, res) => {
  const privateDigit = Math.floor(Math.random() * 10);
  const generator = process.env.GENERATOR as string;
  const primenumber = process.env.PRIMENUMBER as string;

  const publicKeyClient = req.query.publicKeyClient as string;
  const privateKeyServer = modPow(BigInt(publicKeyClient), BigInt(privateDigit), BigInt(primenumber));

  const publicKeyServer = modPow(BigInt(generator), BigInt(privateDigit), BigInt(primenumber)); 
  const username = req.user?.username as string;

  await keytar.setPassword("DiffieHellmanApp", `KEY-${username}`, String(privateKeyServer));

  res.status(200).json({
    publicKeyServer: String(publicKeyServer),
  });
  return;
});

server.get("/users", async (req, res) => {
  const username = req.user?.username as string;

  res.status(200).json({
    status: "success",
    message: await encrypt(users, username),
  });
  return;
});

server.get("/logout", async (req, res) => {
  const username = req.user?.username as string;

  await keytar.deletePassword("DiffieHellmanApp", `KEY-${username}`);

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
