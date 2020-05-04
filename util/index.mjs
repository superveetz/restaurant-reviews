import jwt from "jsonwebtoken";

export const extractUserIdFromAuthHeader = (authHeader) => {
  const authToken = authHeader ? authHeader.slice(7, authHeader.length) : "";
  const decodedAuthToken = jwt.decode(authToken);
  const { userId } = decodedAuthToken;
  return userId;
};

export const verifyJwtToken = async (accessToken) => {
  return jwt.verify(accessToken, process.env.JWT_SECRET, null);
};

export const generateNewJwtToken = (login, userId) => {
  return jwt.sign(
    {
      userLogin: login,
      userId: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h", // todo lower this
    }
  );
};
