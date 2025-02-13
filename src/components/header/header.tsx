"use server"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import AuthUser from "./userRegistration"
import SearchBar from "../searchBar/headerSearchBar"
import Headerbg from "./index"
import Categories from './Categories';

export default async function Header() {
	return (
		<Headerbg>
			<header className='h-16 max-md:px-4 md:px-8 lg:px-20 xl:px-32 flex justify-between items-center gap-5'>
				<Link href="/home" className="h-full w-auto flex justify-start items-center">
					<Image
						src="/quanta.png"
						alt="Vercel logomark"
						width={100}
						height={100}
						className='h-14 w-14'
					/>
				</Link>
				<div className={`w-1/2 h-10 max-md:hidden`}>
					<SearchBar />
				</div>
				<div className='flex justify-end items-center h-full w-auto gap-5 text-stone-400 '>
					<AuthUser />
					<Link href="/" className="max-md:hidden">
						<div className={`flex justify-between items-center gap-3 hover:underline   px-6 py-2 rounded-md`}>
							<div className="relative ">
								<i className='bx bx-cart text-2xl'></i>
								<span className="absolute text-white text-xs -right-3 -top-3 rounded-full h-4 w-4 flex justify-center items-center bg-red-400 ">1</span>
							</div>
							<span className="text-md">Cart</span>
						</div>
					</Link>
				</div>
			</header>
			<Categories />
		</Headerbg>
	)
}

