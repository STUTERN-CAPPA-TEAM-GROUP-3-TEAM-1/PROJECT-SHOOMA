import jwt from "jsonwebtoken";
import config from "config";

export const signToken = (obj) => {
  console.log('appScret:', `${config.get("app.appSecret")}`);
  return jwt.sign(obj, `${config.get("app.appSecret")}`, {
    expiresIn: config.get("api.expiresIn"),
  });
};
