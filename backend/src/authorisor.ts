import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const SECRET = process.env.SECRET || "MY_SECRET";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        username: string;
      };
    }
  }
}

function authorisor(req: Request, res: Response, next: any) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Unauthorized request");
    }
    const decoded = jwt.verify(token, SECRET) as {
      username: string;
    };
    req.user = decoded;
    next();
    return;
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
    return;
  }
}

export default authorisor;
