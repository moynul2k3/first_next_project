"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";
type HeaderProps = {
    children?: React.ReactNode;
};
export default function HeaderBg({children}: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	useEffect(() => {
			const handleScroll = () => {
				setIsScrolled(window.scrollY > 100);
			};
			setIsScrolled(window.scrollY > 100);
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
	}, [])
	return (
		<div id='Headerbg' className={ `${ isScrolled || pathname !== "/" ? "bg-white text-black shadow-md shadow-black/10" : "bg-gradient-to-b from-black/70 to-transparent text-white" } Headerbg fixed top-0 w-full h-auto transition-all duration-100 z-40 ` }>
			{ children }
		</div>
	);
}