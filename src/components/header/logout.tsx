"use client"
//import axios from 'axios';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from '@/lib/Cookie/manageCookie'

const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;


export default function SigninSignup() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const logOut = async () => {
		const refreshToken = await getCookie("refresh");
		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/token/logout/`, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify({ refresh: refreshToken }),
			});
			if (response.ok) {
				document.cookie = `access=; path=/;`;
				document.cookie = `refresh=; path=/;`;
				router.push("/home");
				return router.refresh();
			};
		} catch (error) {
			console.error('Error refreshing access token:', error);
			return ;
		}
		setLoading(false); // Set loading to false after check is complete
	};

	return (
		<div>
			{ loading?(
				<div className={`flex justify-start items-center gap-3  group/item`}>
					<i className='bx bx-log-out text-[25px] font-thin'></i> 
					<p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">Loading...</p>
				</div>
			) : (
				<button onClick={logOut} className={`flex justify-start items-center gap-3  group/item`}>
					<i className='bx bx-log-out text-[25px] font-thin'></i> 
					<p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">Logout</p>
				</button>
			)}
		</div>
	);
}
