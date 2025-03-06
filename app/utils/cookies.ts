import cookie from "cookie";
import { IncomingMessage } from "http";

export const parseCookies = (req?: IncomingMessage) => {
  if (typeof window === "undefined") {
    return cookie.parse(req?.headers.cookie || "");
  } else {
    return cookie.parse(document.cookie);
  }
};