import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "MY_SECRET";

function authorisor(req: any, res: any, next: any) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Unauthorized request");
    }
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
}

export default authorisor;
