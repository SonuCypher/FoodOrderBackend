import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import { User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      authId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hitting parse middleware")
  const { authorization } = req.headers;
  
  if(!authorization) {
    return res.status(401).json("missing authorization");
  }

  const token = authorization.split(" ")[1]
  console.log(token)

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload
    const authId = decoded.sub

    const user = await User.findOne({ authId })

    if (!user){
      return res.sendStatus(401)
    }

    req.authId = authId as string
    req.userId = user._id.toString()
    next()
  } catch (error) {
    return res.sendStatus(401)
  }

};
