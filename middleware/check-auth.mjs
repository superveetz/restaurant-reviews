import jwt from "jsonwebtoken";
import { verifyJwtToken } from "../util/index.mjs";

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // strip out 'Bearer' from token
  const authToken = authorization
    ? authorization.slice(7, authorization.length)
    : "";

  try {
    await verifyJwtToken(authToken);
    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
  }
};

export default checkAuth;
