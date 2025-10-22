import axios from "axios";
import { HOST } from "@/utils/constants";

// Debug: Check if HOST is properly imported
console.log("API Client - HOST:", HOST);

export const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true  // Important for cookies/auth
})