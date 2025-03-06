import { IncomingMessage } from 'http'; // Import from Node.js
import cookie from 'cookie';

export const parseCookies = (req?: IncomingMessage) => {
  // Server-side cookie parsing (from req.headers.cookie)
  if (req) {
    return cookie.parse(req.headers.cookie || "");
  }

  // Client-side cookie parsing (from document.cookie)
  const cookies = document.cookie;  // Access cookies as a string
  const cookieNames = ['citizenID', 'role', 'token'];
  const parsedCookies: Record<string, string> = {};

  cookieNames.forEach((cookieName) => {
    const cookieValue = cookies
      .split("; ")
      .find((cookie) => cookie.startsWith(`${cookieName}=`))
      ?.split("=")[1];
    if (cookieValue) {
      parsedCookies[cookieName] = cookieValue;
    }
  });

  return parsedCookies;
};
