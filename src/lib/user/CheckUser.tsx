import { getCookie, setCookie } from '@/lib/Cookie/manageCookie'
import axios from 'axios';
const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;


export const checkUser = async (): Promise<boolean> => {
    const accessToken = await getCookie("access");
    const refreshToken = await getCookie("refresh");

    try {
        if (refreshToken) {
            if (accessToken && await verifyToken(accessToken)) {
                return true;
            }
            const data = await refreshAccessToken(refreshToken);
            if (data.access && data.refresh) {
                if (await verifyToken(data.access)) {
                    return true;
                }
            }
        }
        return false;
    } catch (error) {
        console.error('Error during token verification:', error);
        return false;
    }
};

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/token/verify/`, { token });
        return response.status === 200;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
};

export const refreshAccessToken = async (refresh: string ): Promise<{ access: string | null; refresh: string | null }> => {
    try {
        const response = await axios.post(`${ API_URL }/token/refresh/`, { refresh });
        setCookie("access", response.data.access, { minutes: 2 });
        setCookie("refresh", response.data.refresh, { days: 30 });
        return { access: response.data.access, refresh: response.data.refresh };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return { access: null, refresh: null };
    }
};

