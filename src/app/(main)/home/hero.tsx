import React from 'react'
import MySwiper from "@/utils/carousel/Banner"
import { fetchBanners, BannerData } from "@/lib/fetchData/fetchData";
import SearchBar from '@/components/searchBar/heroSearchBar';

export default async function hero() {
	const bannerData: BannerData[] = await fetchBanners();
	const slides = bannerData.map((banner) => banner.image);
	return (
		<main className='h-auto w-full brightness-h-80 relative'>
			{ bannerData.length > 0 && (
				<div className=' max-md:h-[400px] md:h-[400px] xl:h-[600px] w-full'>
					<div className='absolute top-0 left-0 bg-gradient-to-br from-black to-transparent w-full h-full z-30 px-10 flex max-xl:justify-end max-xl:pb-12 xl:justify-center items-start  flex-col gap-5 max-md:px-4 md:px-8 lg:px-20 xl:px-32'>
						<p className='max-md:text-3xl md:text-4xl xl:text-6xl text-white font-bold max-md:text-start md:text-center xl:text-start max-xl:w-full xl:w-1/2'><span className='max-md:text-xl md:text-2xl xl:text-4xl'>Welcome to the leading</span> <br />E2B Ecommerce</p>
						<div className='w-full max-md:h-9 md:h-12 flex max-md:justify-start md:justify-center xl:justify-start'>
							<SearchBar />
						</div>
					</div>
					<MySwiper slides={ slides } />
				</div>
			)}
		</main>
	)
}
