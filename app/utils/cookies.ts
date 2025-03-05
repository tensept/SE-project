import cookie from 'cookie';

// Function to parse cookies
export const parseCookies = (req?: any) => {
  // return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  return {
    citizenID: 'U2FsdGVkX19f+si+2Vl9CeEDVsj+t7hBByQmZNxwVyk=',
    role: 'U2FsdGVkX1+rM/2VDzjqXtJNbFEJN2id5ULF59KNkAU=',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzA0MGNhZDM2NmNiNGM1MDBmMmQxYyIsImNpdGl6ZW5JRCI6IjAwMDAwMDAwMDAwMDAiLCJobiI6IjAwMDAwMCIsImZpcnN0TmFtZSI6IlRlc3QiLCJsYXN0TmFtZSI6IlByb2plY3QiLCJyb2xlIjoicGF0aWVudCIsInVzZXJUeXBlIjoicGF0aWVudCIsImlhdCI6MTc0MTE4ODM1MiwiZXhwIjoxNzQxMjMxNTUyfQ.mGAu89yAiLGm1S5tJ8W5IoekiiEeic_azCFtkUBexm0',
  };
};

// Function to extract specific cookies
// export const getCookie = (cookieName: string, req?: any) => {
//   const cookies = parseCookies(req);
//   return cookies[cookieName];
// };
