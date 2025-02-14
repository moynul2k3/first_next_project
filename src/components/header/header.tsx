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
		<Headerbg >
			<header className='h-16 max-md:px-4 md:px-8 lg:px-20 xl:px-32 flex justify-between items-center gap-5 border-b-[1px] border-black/10'>
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
				<div className='flex justify-end items-center h-full w-auto gap-5 text-inherit text-sm'>
					<AuthUser />
					<Link href="/" className="max-md:hidden flex justify-center items-center gap-2 bg-red-500 text-white hover:bg-red-700  w-20  h-10 rounded relative ">
						<div className={`flex justify-center items-center gap-3  px-6 py-2 rounded-md`}>
							<i className='bx bx-cart text-2xl'></i>
							<span className="text-md">(1)</span>
						</div>
						{/*<span className="absolute text-xs -right-3 -top-3 rounded-full h-4 w-4 flex justify-center items-center bg-black text-white ">1</span>*/}
					</Link>
				</div>
			</header>
			<Categories />
		</Headerbg>
	)
}

