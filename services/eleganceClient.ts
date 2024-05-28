import { createEleganceClient } from "@singlestore/elegance-sdk";

export const eleganceClient = createEleganceClient("mysql", {
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
});
