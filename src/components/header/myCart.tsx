"use client"
import { useEffect, useState } from "react";
import Link from "next/link";


export default function App() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
			const handleScroll = () => {
				setIsScrolled(window.scrollY > 100);
			};
	
			setIsScrolled(window.scrollY > 100);
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
	}, []);
  	return (
	    <Link href="/" className="max-md:hidden flex justify-center items-center gap-2 bg-gradient_bg  text-white hover:opacity-85  w-12  h-10 rounded relative ">
			<div className={`flex justify-center items-center h-full w-full `}>
				<i className='bx bx-cart text-2xl'></i>
				<span className={`text-md h-6 w-6 ${isScrolled?"bg-[#3a3a3a] text-white":"bg-white text-black"}  rounded-full absolute -top-3 -right-3 flex justify-center items-center`}>5</span>
			</div>
		</Link>
  	);
}
