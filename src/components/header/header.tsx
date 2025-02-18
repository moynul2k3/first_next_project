"use server"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import AuthUser from "./userRegistration"
import SearchBar from "../searchBar/headerSearchBar"
import Headerbg from "./index"
import Categories from './Categories';
import MyCart from './myCart'

export default async function Header() {
	return (
		<Headerbg >
			<header className='max-md:h-14 md:h-20 max-md:px-4 md:px-8 lg:px-20 xl:px-32 flex justify-between items-center gap-5 border-b-[1px] border-black/10'>
				<Link href="/" className="h-full w-auto flex justify-start items-center gap-1">
					<Image
						src="/quanta.png"
						alt="Vercel logomark"
						width={100}
						height={100}
						className='max-md:h-10 md:h-12 xl:h-14 max-md:w-10 md:w-12 xl:w-14'
					/>
					<div className='w-full flex justify-center items-start flex-col gap-0 text-inherit max-md:hidden'>
						<p className='md:text-2xl xl:text-3xl font-bold'>DOT 95</p>
						<p className='md:text-[7px] xl:text-[9px]'>Where find your comfort</p>
					</div>
				</Link>
				<div className={`w-1/2 h-10 max-md:hidden`}>
					<SearchBar />
				</div>
				<div className='flex justify-end items-center h-full w-auto gap-5 text-inherit text-sm'>
					<AuthUser />
					<MyCart  />
				</div>
			</header>
			<Categories />
		</Headerbg>
	)
}

