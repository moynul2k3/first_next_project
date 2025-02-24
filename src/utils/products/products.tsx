"use client"; // Required in Next.js 15+
import '@splidejs/splide/css';
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Products {
    id: number;
    name: string;
    image: string;
}

interface CarouselProps {
    Products: Products[];
}

const ProductCarousel = ({ Products }: CarouselProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Products.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [Products]);// Re-run effect when `Products` data changes

    return (
        <section className="w-full">
            { loading
                ? (
                    <ul className={`h-auto w-full grid max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 xl:grid-cols-5 gap-2 max-md:gap-y-4 md:gap-y-3 xl:gap-y-5`}>
						{ Array.from({ length: 20 }).map((_, index) => (
						<div key={index}>
                            <div  className="bg-black/10 relative max-xl:rounded-md xl:rounded-xl overflow-hidden shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#CC1554,1px_0px_5px_#6A4385] transition-shadow duration-300 swiper-slide  max-md:pb-1 md:pb-2">
                                <div className="">
                                    <Skeleton className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-black/20">
                                        <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm w-8">     </p>
                                    </Skeleton>
                                    <div className="w-full h-auto flex justify-center max-md:h-[150px] md:h-[200px] xl:h-[250px]">
                                        
                                    </div>
                                    <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-md:px-2 md:px-3">
                                        <Skeleton className="bg-black/20 max-md:text-xs md:text-md xl:text-xl noto_sans line-clamp-2 w-full h-4"></Skeleton>
                                        <div className="flex justify-between items-center gap-10 max-xl:mt-[1px] xl:mt-1 max-xl:py-1 xl:py-2">
                                            <Skeleton className="bg-black/20 w-10 h-3 max-md:text-[10px] md:text-sm xl:text-lg"></Skeleton>
                                            <Skeleton className="bg-black/20 w-10 h-3 max-xl:text-[10px] xl:text-[12px] font-semibold flex justify-center items-center">
                                                
                                            </Skeleton>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex justify-between items-center max-xl:gap-1 xl:gap-2 max-md:px-1 md:px-2">
                                    <Skeleton  className="bg-black/20 w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md  hover:opacity-85 max-md:text-xs text-white">Buy Now</Skeleton>
                                    <Skeleton className="bg-black/20 max-md:w-10 md:w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md hover:opacity-85 max-md:text-xs text-white">
                                        <span className='max-md:hidden'>Add to Cart</span>
                                        <span className='md:hidden'><i className='bx bxs-cart-add text-xl h-full w-full flex justify-center items-center'></i></span>
                                    </Skeleton>
                                </div>
							</div>
						</div>
                        ))}
                    </ul>
                )
                : (
                    <div className=" mt-1 py-5 pb-10 w-full">
                        <ul className=" h-auto w-full grid max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 xl:grid-cols-5 gap-2 max-md:gap-y-4 md:gap-y-3 xl:gap-y-5">
							{ Products.map((Product) => (
								<div key={Product.id}>
                                    <li  className=" relative max-xl:rounded-md xl:rounded-xl overflow-hidden shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#CC1554,1px_0px_5px_#6A4385] transition-shadow duration-300 swiper-slide  max-md:pb-1 md:pb-2">
                                        <Link href="/about" className="">
                                            <div className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-[#3a3a3a]">
                                                <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm ">- 40%</p>
                                            </div>
                                            <div className="w-full h-auto flex justify-center">
                                                <Image src={Product.image} alt={Product.name} width={300} height={400} className="max-md:h-[150px] md:h-[200px] xl:h-[250px]" />
                                            </div>
                                            <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-md:px-2 md:px-3">
                                                <p className="max-md:text-xs md:text-md xl:text-xl noto_sans line-clamp-2">{Product.name}</p>
                                                <div className="flex justify-between items-center max-xl:mt-[1px] xl:mt-1 max-xl:py-1 xl:py-2">
                                                    <p className="max-md:text-[10px] md:text-sm xl:text-lg">Points: 43</p>
                                                    <p className="max-xl:text-[10px] xl:text-[12px] font-semibold flex justify-center items-center">
                                                        <del className=""><span className="noto_sans">৳</span>800</del>&nbsp;&nbsp;&nbsp;
                                                        <span className="noto_sans max-md:text-[14px] md:text-[20px]">৳</span>&nbsp;
                                                        <span className="max-md:text-[12px] md:text-[16px]">400</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className=" flex justify-between items-center max-xl:gap-1 xl:gap-2 max-md:px-1 md:px-2">
                                            <Link href="/" className="w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md bg-gradient_bg hover:opacity-85 max-md:text-xs text-white">Buy Now</Link>
                                            <Link href="/" className="max-md:w-10 md:w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md bg-gradient_bg hover:opacity-85 max-md:text-xs text-white">
                                                <span className='max-md:hidden'>Add to Cart</span>
                                                <span className='md:hidden'><i className='bx bxs-cart-add text-xl h-full w-full flex justify-center items-center'></i></span>
                                            </Link>
                                        </div>
									</li>
								</div>
                            ))}
                        </ul>
                    </div>
            )}
            
        </section>
    );
};

export default ProductCarousel;
