import {setCookie} from '@/lib/Cookie/manageCookie'
import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;

export const checkUserExists = async (email: string) => {
    try {
        const response = await axios.get(`${API_URL}/check-user-exists/`, {
            params: { email },
            withCredentials: true,
        });
        return response.data.exists;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/signin/`,
            { email, password },
            {
                withCredentials: true, // Send cookies
            }
        );
        setCookie("access", response.data.access, { minutes: 2 });
        setCookie("refresh", response.data.refresh, { days: 30 });
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (email:string, password:string, confirm_password:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/signup/`,
            { email, password, confirm_password},
            {
                withCredentials: true, // Send cookies
            }
        );
        setCookie("access", response.data.access, { minutes: 1 });
        setCookie("refresh", response.data.refresh, { days: 30 });
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const sendOtp = async (email:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/send_otp/`,
            { email},
            {
                withCredentials: true, // Send cookies
            }
        );
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const verifyOtp = async (email:string, otpValue:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/verify_otp/`,
            { email, otpValue},
            {
                withCredentials: true, // Send cookies
            }
        );
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email:string, password:string, confirm_password:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/forgot_password/`,
            { email, password, confirm_password },
            {
                withCredentials: true, // Send cookies
            }
        );
        setCookie("access", response.data.access, { minutes: 1 });
        setCookie("refresh", response.data.refresh, { days: 30 });
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

