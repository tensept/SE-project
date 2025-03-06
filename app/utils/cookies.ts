import { IncomingMessage } from 'http'; // Import from Node.js
import cookie from 'cookie';

export const parseCookies = (req?: IncomingMessage) => {
  // // Server-side cookie parsing (from req.headers.cookie)
  // if (req) {
  //   return cookie.parse(req.headers.cookie || "");
  // }

  // // Client-side cookie parsing (from document.cookie)
  // const cookies = document.cookie;  // Access cookies as a string
  // const cookieNames = ['citizenID', 'role', 'token'];
  // const parsedCookies: Record<string, string> = {};

  // cookieNames.forEach((cookieName) => {
  //   const cookieValue = cookies
  //     .split("; ")
  //     .find((cookie) => cookie.startsWith(`${cookieName}=`))
  //     ?.split("=")[1];
  //   if (cookieValue) {
  //     parsedCookies[cookieName] = cookieValue;
  //   }
  // });

  // return parsedCookies;
  return {
    citizenID: 'U2FsdGVkX18smB9GK59zUJUCGjBvYsY60MV5KbRVbgk=', role: 'U2FsdGVkX1+xNzEIGe87E0yEWfk3ne1mfo1fz04XFIg=', token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzA0MGNhZDM2NmNiNGM1MDBmMmQxYyIsImNpdGl6ZW5JRCI6IjAwMDAwMDAwMDAwMDAiLCJobiI6IjAwMDAwMCIsImZpcnN0TmFtZSI6IlRlc3RUZXN0IiwibGFzdE5hbWUiOiJQcm9qZWN0Iiwicm9sZSI6InBhdGllbnQiLCJ1c2VyVHlwZSI6InBhdGllbnQiLCJpYXQiOjE3NDEyNDgzMDgsImV4cCI6MTc0MTI5MTUwOH0.6ZyuPvpDX4WSmwvMT_BNzRVdRFT5f5sZ_-Kdocv6on0'
  }
};
