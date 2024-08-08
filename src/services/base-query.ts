export const baseUrl = process.env.NEXT_APP_API;
export const basePublicUrl = process.env.NEXT_PUBLIC_API;

const defaultToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMwMTk5NzYsImlhdCI6MTcyMzAxMjc3NiwibmJmIjoxNzIzMDEyNzc2LCJzdWIiOiJkYTQyOGY2Mi0xMzBmLTQ1ZDEtOGU2Mi1lNmY3MTQ3MTc0YTMiLCJ1c2VyIjp7InVzZXJfaWQiOiJkYTQyOGY2Mi0xMzBmLTQ1ZDEtOGU2Mi1lNmY3MTQ3MTc0YTMiLCJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJlbWFpbCI6ImRhaWxlY2xvdWQwODEyQGdtYWlsLmNvbSJ9fQ.rqXpXSVY-3tqvvs38f-zNnxxuPv2F0jRSSSNpaiDpyE';
export const baseAuthQuery = (): RequestInit => ({
  headers: {
    // Authorization: `Bearer ${defaultToken}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
