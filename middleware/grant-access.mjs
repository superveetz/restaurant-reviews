import mongoose from "mongoose";
import roles from "../config/roles.mjs";

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    try {
      const user = await mongoose.model("User").findByAuthHeader(authorization);
      const permission = roles.can(user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: {
            message: "You are not authorized to perform this action",
          },
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default grantAccess;
