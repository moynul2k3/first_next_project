"use server"; // ✅ Required for Server Actions
import { cookies } from "next/headers";

// ✅ Get a cookie (Server-side only)
export const getCookie = async (name: string): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
};

//export const deleteCookie = (name: string) => {
//  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//};


export const setCookie = async (
  name: string,
  value: string,
  options?: { days?: number; hours?: number; minutes?: number; seconds?: number }
) => {
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = options || {};
  
  const expires = new Date(
    Date.now() + 
    days * 24 * 60 * 60 * 1000 + 
    hours * 60 * 60 * 1000 + 
    minutes * 60 * 1000 + 
    seconds * 1000
  );

  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    path: "/",
    expires,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
};





// get Cookie in SSR
// import { getCookie } from "@/app/actions/cookies";

// export default async function HomePage() {
//     const userToken = getCookie("userToken"); // ✅ Works in Server Component

//     return (
//         <div>
//             <h1>Welcome to My App</h1>
//             <p>Stored Cookie: {userToken || "No Cookie Set"}</p>
//         </div>
//     );
// }





// set and get Cookie in CSR
// "use client";
// import { useState } from "react";
// import { setCookie, getCookie } from "@/app/actions/cookies";

// export default function CookieManager() {
//     const [cookieValue, setCookieValue] = useState("");

//     const handleSetCookie = async () => {
//         await setCookie("userToken", "12345", 7);
//     };

//     const handleGetCookie = async () => {
//         const value = await getCookie("userToken"); // Works only in Server Components
//         setCookieValue(value || "No Cookie Found");
//     };

//     return (
//         <div>
//         <button onClick={handleSetCookie}>Set Cookie</button>
//         <br />
//             <button onClick={handleGetCookie}>Get Cookie</button>
//             <p>Cookie Value: {cookieValue}</p>
//         </div>
//     );
// }

