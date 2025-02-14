"use client"
import React, { useEffect, useState } from 'react'
type HeaderProps = {
    children?: React.ReactNode;
};
export default function HeaderBg({children}: HeaderProps) {
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
	}, [])
	return (
		<div id='Headerbg' className={ `${ isScrolled ? "bg-white text-black" : "bg-gradient-to-b from-black/70 to-transparent text-white" } Headerbg fixed top-0 w-full h-[6.5rem]  transition-all ease-in-out duration-300 z-40` }>
			{ children }
		</div>
	);
}