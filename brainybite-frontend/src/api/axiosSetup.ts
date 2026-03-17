import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      // extract user Session from Cognito
      const session = await fetchAuthSession();

      // extract JWT Token (Amplify V6 tokens.accessToken or idToken)
      const token = session.tokens?.accessToken?.toString();

      // if have Token attach with Header in Bearer Token from
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // if Error
      console.log("No active user session. Requesting without token.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
