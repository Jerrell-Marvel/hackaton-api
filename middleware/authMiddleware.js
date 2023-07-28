import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import axios from "axios";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  // if (!token) {
  //   throw new UnauthorizedError("token not provided");
  // }

  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = {
  //     username: payload.username,
  //     userId: payload.userId,
  //     role: payload.role,
  //     isGoogleUser: payload.isGoogleUser,
  //   };
  //   next();
  // } catch (err) {
  //   throw new UnauthorizedError("invalid token");
  // }

  try {
    const userInfoResponse = await axios.post("http://34.101.154.14:8175/hackathon/user/info", null, {
      headers: {
        Authorization: authorization,
      },
    });

    const userData = userInfoResponse.data.data;

    req.user = userData;
    next();
  } catch (err) {
    throw new UnauthorizedError("unauthorized");
  }
};
